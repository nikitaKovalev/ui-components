import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOWN_ARROW, ENTER, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { filter, fromEvent, merge, takeUntil, tap } from 'rxjs';

import { DROPDOWN_PROVIDERS } from '../../directives/dropdown-controller/dropdown.providers';
import { DROPDOWN_CONTROLLER, UiDropdownController } from '../../directives/dropdown-controller/dropdown.controller';
import { UiDropdownOptionComponent } from '../dropdown-option';

@Component({
  selector: 'ui-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
  host: {
    '(focusin)': '_onFocus($event)',
  },
  providers: DROPDOWN_PROVIDERS,

  // todo: move animation to core
  animations: [
    trigger('fadeInDropdown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-5px)' }),
        animate('300ms ease-in-out'),
      ]),
      state(':leave', style({ opacity: 1, transform: 'translateY(0%)' })),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownListComponent
  implements AfterViewInit {

  @Input()
  public disabled = false;

  @Input()
  public value: unknown = null;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  @Output()
  public readonly controlValueChange = new EventEmitter<unknown>();

  @ViewChild('dropdownRef', { static: true })
  public readonly dropdownRef!: TemplateRef<NgTemplateOutlet>;

  private _overlayRef: OverlayRef | null = null;
  private _hostedInput: ElementRef<HTMLInputElement> | null = null;
  private readonly _defaultHeight = 120;
  private readonly _defaultOffsetY = 8;

  private _keyManager: ActiveDescendantKeyManager<UiDropdownOptionComponent>
    = new ActiveDescendantKeyManager<UiDropdownOptionComponent>([]);

  constructor(
    @Inject(DOCUMENT)
    private readonly _document: Document,
    private readonly _host: ElementRef,
    private readonly _viewCRef: ViewContainerRef,
    private readonly _overlay: Overlay,
    @Inject(DROPDOWN_CONTROLLER)
    private readonly _controller: UiDropdownController,
  ) {}

  public ngAfterViewInit(): void {
    this._updateInitialValue();

    if (this._canOpen) {
      this._keyManager = new ActiveDescendantKeyManager<UiDropdownOptionComponent>(
        this._controller.options,
      )
        .withWrap(true);
    }
  }

  public _onFocus({ target }: FocusEvent): void {
    if (this._canOpen && !this._panelOpened) {
      this._setInputReference(target as HTMLInputElement);

      this._createOverlay();

      this._onClick();
      this._onKeydown();
      this._onOptionSelect();
    }
  }

  public _onKeydown(): void {
    fromEvent<KeyboardEvent>(this._document, 'keydown')
      .pipe(
        tap(({ keyCode }: KeyboardEvent) => {
          keyCode === TAB ? this._detachOverlay() : null
        }),
        filter(({ keyCode }: KeyboardEvent) => {
          return keyCode === ENTER || keyCode === DOWN_ARROW || keyCode === UP_ARROW
        }),
        takeUntil(this._overlayRef!.detachments()),
      )
      .subscribe((event: KeyboardEvent) => {
        event.keyCode === ENTER
          ? this._keyManager.activeItem?.onClick()
          : this._keyManager.onKeydown(event);
      });
  }

  private _onClick(): void {
    merge(
      fromEvent<MouseEvent>(this._document, 'click'),
      fromEvent<MouseEvent>(this._document, 'auxclick'),
      fromEvent<MouseEvent>(this._document, 'touchend'),
    )
      .pipe(
        filter(() => this._panelOpened),
        filter(({ target }: MouseEvent) => {
          const notInput = target !== this._hostedInput!.nativeElement;
          const notAutocomplete = !this._overlayRef!.overlayElement.contains(target as Node);

          return notInput && notAutocomplete;
        }),
        takeUntil(this._overlayRef!.detachments()),
      )
      .subscribe(() => this._detachOverlay());
  }

  private _onOptionSelect(): void {
    this._controller.optionSelected$
      .pipe(takeUntil(this._overlayRef!.detachments()))
      .subscribe((value: unknown) => {
        this.controlValueChange.emit(value);
        this.valueChange.emit(this._controller.displayAs(value));
        this._detachOverlay();
      });
  }

  private _createOverlay(): void {
    const overlayConfig: OverlayConfig = this._getOverlayConfig();
    this._overlayRef = this._overlay.create(overlayConfig);

    const template = new TemplatePortal(this.dropdownRef, this._viewCRef);
    this._overlayRef.attach(template);
  }

  private _detachOverlay(): void {
    if (this._panelOpened) {
      this._overlayRef!.dispose();
      this._overlayRef!.detach();
      this._overlayRef = null;
      this._keyManager.setActiveItem(-1);
    }
  }

  private _getOverlayConfig(): OverlayConfig {
    return <OverlayConfig> {
      width: this._host.nativeElement.offsetWidth,
      maxHeight: this._defaultHeight,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._getOverlayPosition(),
      disposeOnNavigation: true,
    };
  }

  private _getOverlayPosition(): FlexibleConnectedPositionStrategy {
    const positions: ConnectedPosition[] = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' },
        0, this._defaultOffsetY
      ),
      new ConnectionPositionPair(
        { originX: 'end', originY: 'top' },
        { overlayX: 'end', overlayY: 'bottom' },
        0, -this._defaultOffsetY
      ),
    ];

    return this._overlay
      .position()
      .flexibleConnectedTo(this._host.nativeElement)
      .withPositions(positions)
      .withFlexibleDimensions(true)
      .withPush(true);
  }

  private get _canOpen(): boolean {
    return !this.disabled && !this._controller.readOnly && this._controller.enabled;
  }

  private get _panelOpened(): boolean {
    return !!this._overlayRef?.hasAttached();
  }

  private _setInputReference(input: HTMLInputElement): void {
    if (!this._hostedInput) {
      this._hostedInput = new ElementRef<HTMLInputElement>(input);
    }
  }

  private _updateInitialValue(): void {
    if (this.value) {
      this.valueChange.emit(this._controller.displayAs(this.value));
    }
  }

}
