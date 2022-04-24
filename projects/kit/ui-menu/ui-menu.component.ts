import {
  ConnectionPositionPair,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { watch } from '@ui-components/core/rxjs';
import { Palette } from '@ui-components/core/types';
import { UiOptionComponent } from '@ui-components/kit/ui-option';
import {
  filter,
  fromEvent,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { tap } from 'rxjs/operators';

import { fadeIn, fadeOut } from './fade.animation';
import { toggle } from './ui-menu.animation';
import {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  PositionType,
  ToggleType,
  TOP_LEFT,
  TOP_RIGHT,
} from './ui-menu.type';

// todo: replace with uiButton + dropdown-host
@Component({
  selector: 'ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss'],
  animations: [toggle, fadeIn, fadeOut],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMenuComponent implements AfterViewInit, OnDestroy {
  private _overlayRef: OverlayRef | null = null;

  private readonly _destroyed$ = new Subject<void>();

  @HostBinding('attr.type')
  @Input()
  type: ToggleType = 'more_vert';

  @HostBinding('attr.color')
  @Input()
  color: Palette = 'primary';

  @Input('position')
  set overlayPosition(position: PositionType) {
    this.position = this._getPosition(position);
  }

  @HostBinding('class.menu-button')
  readonly class = true;

  @ViewChild(TemplatePortalDirective)
  contentTemplate: TemplatePortalDirective | null = null;

  @ContentChildren(UiOptionComponent)
  readonly options: QueryList<UiOptionComponent> = new QueryList<UiOptionComponent>();

  position: ConnectionPositionPair[] = [BOTTOM_LEFT, TOP_LEFT];

  trigger = 'close';

  constructor(
    private readonly _elRef: ElementRef,
    private readonly _overlay: Overlay,
    private readonly _cdRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this._subContainerClicked();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  protected _subContainerClicked(): void {
    fromEvent(this._elRef.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.trigger = this.trigger === 'close' ? this.type : 'close';
        }),
        watch(this._cdRef),
        filter(() => !!this.options.length),
        tap(() => {
          this._overlayRef = this._overlay.create(this._overlayConfig);
          this._overlayRef.attach(this.contentTemplate);
        }),
        switchMap(() => this._getCloseEmitters$()),
        takeUntil(this._destroyed$),
      )
      .subscribe(() => {
        this.trigger = 'close';

        this._overlayRef!.detach();
        this._overlayRef!.dispose();
        this._overlayRef = null;
        this._cdRef.markForCheck();
      });
  }

  private _getCloseEmitters$(): Observable<unknown | MouseEvent> {
    const clicked$ = of(this.options.toArray()).pipe(
      switchMap((options: UiOptionComponent[]) => {
        const click$ = options?.map((option: UiOptionComponent) => option.click$) || [];

        return merge(...click$);
      }),
    );

    return merge(clicked$, this._overlayRef!.backdropClick());
  }

  protected get _overlayConfig(): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elRef)
      .withPush(false)
      .withPositions(this.position);

    const overlayConfig: OverlayConfig = {
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._overlay.scrollStrategies.block(),
    };

    return new OverlayConfig(overlayConfig);
  }

  private _getPosition(position: PositionType): ConnectionPositionPair[] {
    switch (position) {
      case 'bottom-left':
        return [BOTTOM_LEFT, TOP_LEFT];
      case 'bottom-right':
        return [BOTTOM_RIGHT, TOP_RIGHT];
      case 'top-left':
        return [TOP_LEFT, BOTTOM_LEFT];
      case 'top-right':
        return [TOP_RIGHT, BOTTOM_RIGHT];
    }
  }
}
