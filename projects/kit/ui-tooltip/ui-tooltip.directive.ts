import { ComponentRef, Directive, ElementRef, Inject, Input, NgZone } from '@angular/core';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { delay, fromEvent, iif, merge, Observable, of, switchMap, takeUntil, tap } from 'rxjs';

import { UiDestroyedService } from '@ui-components/core/services';
import { zoneOptimized } from '@ui-components/core/rxjs';
import { Palette, TODO_ANY } from '@ui-components/core/types';

import { UiTooltipComponent } from './ui-tooltip.component';

type TooltipPosition = 'start' | 'end' | 'top' | 'bottom';

@Directive({
  selector: '[uiTooltip]',
  providers: [ UiDestroyedService ],
})
export class UiTooltipDirective {

  @Input()
  public uiTooltip: any = null;

  @Input('uiTooltipPosition')
  public position: TooltipPosition = 'top';

  @Input('uiTooltipColor')
  public color: Palette = 'default';

  private _overlayRef: OverlayRef | null = null;

  constructor(
    private readonly _ngZon: NgZone,
    private readonly _elRef: ElementRef,
    private readonly _overlay: Overlay,
    @Inject(UiDestroyedService)
    private readonly _destroyed$: UiDestroyedService,
  ) {
    this._toggle();
  }

  private _toggle(): void {
    merge(this._mouseOver$(), this._mouseLeave$())
      .pipe(
        zoneOptimized(this._ngZon),
        takeUntil(this._destroyed$),
      )
      .subscribe();
  }

  private _mouseOver$(): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(this._elRef.nativeElement, 'mouseover')
      .pipe(
        tap(this._detach()),
        tap(() => this._create()),
      );
  }

  private _mouseLeave$(
    ref = this._elRef.nativeElement,
  ): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(ref, 'mouseleave').pipe(
      delay(200),
      switchMap((event: MouseEvent) => iif<MouseEvent, TODO_ANY>(
        () => event.relatedTarget === this._overlayRef?.overlayElement.childNodes[0],
        this._mouseLeave$(this._overlayRef?.overlayElement),
        of(null),
      )),
      tap(this._detach())
    );
  }

  private _create(): void {
    this._overlayRef = this._overlay.create(this._getConfig());

    const tooltipRef: ComponentRef<UiTooltipComponent> = this._overlayRef.attach(
      new ComponentPortal(UiTooltipComponent),
    );
    tooltipRef.instance.value = this.uiTooltip;
    tooltipRef.instance.color = this.color;
  }

  private _detach(): () => void {
    return () => {
      if (this._overlayRef) {
        this._overlayRef.detach();
        this._overlayRef = null;
      }
    }
  }

  private _getConfig(): OverlayConfig {
    return <OverlayConfig>{
      width: 'auto',
      height: 'auto',
      maxWidth: '200px',
      minHeight: '20px',
      positionStrategy: this._getPositionStrategy(),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true,
    }
  }

  private _getPositionStrategy(): FlexibleConnectedPositionStrategy {
    return this._overlay
      .position()
      .flexibleConnectedTo(this._elRef.nativeElement)
      .withPositions(this._getPositions())
      .withFlexibleDimensions(true)
      .withPush(true);
  }

  private _getPositions(): ConnectionPositionPair[] {
    if (this.position === 'start' || this.position === 'end') {
      return this._getXPairs(this.position);
    }

    return this._getYPairs(this.position);
  }

  private _getXPairs(position: TooltipPosition): ConnectionPositionPair[] {
    const start = position === 'start' ? 'start' : 'end';
    const opposite = position === 'start' ? 'end' : 'start';

    return [
      new ConnectionPositionPair(
        { originX: start, originY: 'center' },
        { overlayX: opposite, overlayY: 'center' },
        start === 'start' ? -8 : 8
      ),
      new ConnectionPositionPair(
        { originX: opposite, originY: 'center' },
        { overlayX: start, overlayY: 'center' },
        start === 'start' ? -8 : 8
      )
    ];
  }

  private _getYPairs(position: TooltipPosition): ConnectionPositionPair[] {
    const start = position === 'top' ? 'top' : 'bottom';
    const opposite = position === 'top' ? 'bottom' : 'top';

    return [
      new ConnectionPositionPair(
        { originX: 'start', originY: start },
        { overlayX: 'start', overlayY: opposite },
        void 0, start === 'top' ? -8 : 8
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: opposite },
        { overlayX: 'start', overlayY: start },
        void 0, start === 'top' ? -8 : 8
      )
    ];
  }

}
