import { ComponentRef, Directive, ElementRef, HostListener, Input } from '@angular/core';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { UiDestroyedService } from '@ui-components/core/services';
import { Palette } from '@ui-components/core/types';

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
    private readonly _elRef: ElementRef,
    private readonly _overlay: Overlay,
  ) {}

  @HostListener('mouseover')
  private _create(): void {
    this._detach();

    this._overlayRef = this._overlay.create(this._getConfig());

    const tooltipRef: ComponentRef<UiTooltipComponent> = this._overlayRef.attach(
      new ComponentPortal(UiTooltipComponent),
    );
    tooltipRef.instance.value = this.uiTooltip;
    tooltipRef.instance.color = this.color;
  }

  @HostListener('mouseleave')
  private _detach(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._overlayRef = null;
    }
  }

  private _getConfig(): OverlayConfig {
    return <OverlayConfig>{
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
