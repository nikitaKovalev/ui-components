import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TAB } from '@angular/cdk/keycodes';

import { delay, filter, fromEvent, map, merge, Subject, take, takeUntil, tap } from 'rxjs';

import { UiAutocompleteComponent } from './ui-autocomplete.component';

import { UiInputComponent } from '../ui-input/ui-input.component';

type TODO_ANY = any;

@Directive({ selector: '[uiAutocomplete]' })
export class UiAutocompleteDirective
  implements OnInit, OnDestroy {

  @Input()
  public uiAutocomplete: UiAutocompleteComponent = new UiAutocompleteComponent();

  private _overlayRef: OverlayRef = this._overlay.create({});

  private get _element(): TODO_ANY {
    return this._elRef.nativeElement;
  }

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Optional()
    @Self()
    private readonly _ngControl: NgControl,
    private readonly _elRef: ElementRef,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _viewCRef: ViewContainerRef,
    private readonly _overlay: Overlay,
    @Optional()
    @Self()
    private readonly _uiInput: UiInputComponent,
  ) {}

  public ngOnInit(): void {
    this._updateInitialValue();
    this._subInputFocused();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _subInputFocused(): void {
    /** focusin bubbles while focus does not */
    fromEvent(this._element, 'focusin')
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => {
        this._open();

        this._subOptionSelected();

        this._subInputBlured();
      });
  }

  private _subInputBlured(): void {
    merge(
      fromEvent(this._element, 'blur').pipe(
        /** delay needed for native input */
        delay(200)
      ),
      /** blur does not bubble event */
      this._overlayRef.keydownEvents().pipe(
        filter(({ keyCode }) => keyCode === TAB),
      ),
    )
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => this._close());
  }

  private _subOptionSelected(): void {
    this.uiAutocomplete.getOptionSelected$()
      .pipe(
        /** reduce emit counter */
        take(1),
        tap(() => this._cdRef.markForCheck()),
        takeUntil(this._destroyed$),
      )
      .subscribe((value: TODO_ANY) => {
        this._close();

        this._ngControl?.control?.patchValue(value);

        this._updateInput(this.uiAutocomplete.displayWith(value));
      });
  }

  private _updateInitialValue(): void {
    this.uiAutocomplete.displayWith$
      .pipe(
        filter(() => !!this._ngControl?.control?.value),
        map(() => this.uiAutocomplete.displayWith(this._ngControl.control?.value) || ''),
        tap(() => this._cdRef.markForCheck()),
        takeUntil(this._destroyed$),
      )
      .subscribe((value: string) => {
        this._updateInput(value);
      });
  }

  private _updateInput(displayValue: string): void {
    if (this._uiInput) {
      this._uiInput.value = displayValue;
    } else {
      this._element.value = displayValue;
    }
  }

  /**
   * OVERLAY SETTINGS
   **/
  private _open(): void {
    /** detach overlay if already opened */
    this._close();

    const overlayConfig: OverlayConfig = this._getOverlayConfig();
    this._overlayRef = this._overlay.create(overlayConfig);

    const template = new TemplatePortal(
      this.uiAutocomplete.templateRef as TemplateRef<TODO_ANY>,
      this._viewCRef,
    );
    this._overlayRef.attach(template);

    this._subBackdropClick();
  }

  private _close(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

  private _subBackdropClick(): void {
    this._overlayRef.backdropClick()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => this._close());
  }

  private _getOverlayConfig(): OverlayConfig {
    return <OverlayConfig> {
      width: this._element.offsetWidth,
      maxHeight: 40 * 3,
      hasBackdrop: true,
      backdropClass: '',
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._getOverlayPosition(),
      disposeOnNavigation: true,
    };
  }

  private _getOverlayPosition(): FlexibleConnectedPositionStrategy {
    const { height } = this._element.getBoundingClientRect();
    const positions: ConnectedPosition[] = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' },
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'top' },
        0, -height
      ),
    ];

    return this._overlay
      .position()
      .flexibleConnectedTo(this._element)
      .withPositions(positions)
      .withFlexibleDimensions(true)
      .withPush(true);
  }

}
