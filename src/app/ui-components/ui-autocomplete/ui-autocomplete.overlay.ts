import { Directive, ElementRef, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay, OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';

import { Subject, takeUntil } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive()
export abstract class UiAutocompleteOverlay
  implements OnDestroy {

  protected _overlayRef: OverlayRef | null = null;

    // set template ref to attach Overlay
  protected _templateRef: TemplateRef<any> | null = null;
  public get templateRef(): TemplateRef<any> | null {
    return this._templateRef;
  }
  public set templateRef(tmpRef: TemplateRef<any> | null) {
    this._templateRef = tmpRef;
  }

  // override overlay positions
  protected _positions: ConnectedPosition[] = [];
  public get positions(): ConnectedPosition[] {
    return this._positions;
  }
  public set positions(positions: ConnectedPosition[]) {
    this._positions = positions;
  }

  public get elRef(): ElementRef<HTMLInputElement> {
    return this._elRef.nativeElement instanceof HTMLInputElement
      ? this._elRef
      : new ElementRef(
        this._renderer.selectRootElement('input')
      );
  }

  public readonly destroyed$ = new Subject<void>();

  protected constructor(
    protected readonly _elRef: ElementRef,
    protected readonly _renderer: Renderer2,
    protected readonly _viewCRef: ViewContainerRef,
    protected readonly _overlay: Overlay,
  ) {}

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected abstract subOptionSelected(): void;

  public open(): void {
    // detach overlay if already opened
    this.close();

    const overlayConfig: OverlayConfig = this._getOverlayConfig();
    this._overlayRef = this._overlay.create(overlayConfig);

    const template = new TemplatePortal(this.templateRef as TemplateRef<any>, this._viewCRef);
    this._overlayRef.attach(template);

    this._subBackdropClick();
  }

  public close(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._overlayRef = null;
    }
  }

  private _subBackdropClick(): void {
    this._overlayRef?.backdropClick()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.close());
  }

  private _getOverlayConfig(): OverlayConfig {
    return {
      width: this._elRef.nativeElement.offsetWidth,
      maxHeight: 40 * 3,
      hasBackdrop: true,
      backdropClass: '',
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._getOverlayPosition(),
      disposeOnNavigation: true,
    };
  }

  private _getOverlayPosition(): FlexibleConnectedPositionStrategy {
    const { height } = this._elRef.nativeElement.getBoundingClientRect();
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
      .flexibleConnectedTo(this._elRef.nativeElement)
      .withPositions(this.positions.length ? this.positions : positions)
      .withFlexibleDimensions(true)
      .withPush(true);
  }
}
