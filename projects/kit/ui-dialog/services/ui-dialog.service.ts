import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';

import { DialogConfig } from '../interfaces';
import { UiDialogComponent } from '../ui-dialog.component';
import { UiDialogRef } from '../ui-dialog-ref';

@Injectable()
export class UiDialogService {
  private _overlayRef: OverlayRef | null = null;

  constructor(private readonly _overlay: Overlay, private readonly _injector: Injector) {}

  open<T>(component: Type<T>, config: DialogConfig): UiDialogRef<T> {
    const overlayConfig = this._overlayConfig(config);

    this._closeAttachedOverlay();

    this._overlayRef = this._overlay.create(overlayConfig);

    const overlayRef = new UiDialogRef<T>(this._overlayRef, component, config?.data);
    const injector = this._createInjector(overlayRef, this._injector);
    const componentPortal = new ComponentPortal(UiDialogComponent, null, injector);

    this._overlayRef.attach(componentPortal);

    return overlayRef;
  }

  private _createInjector(dialogRef: UiDialogRef, injector: Injector): PortalInjector {
    const injectorTokens = new WeakMap([[UiDialogRef, dialogRef]]);

    return new PortalInjector(injector, injectorTokens);
  }

  private _overlayConfig(config: DialogConfig): OverlayConfig {
    return new OverlayConfig({
      panelClass: ['ui-dialog'],
      width: config?.width || '400px',
      maxHeight: config?.height || '400px',
      hasBackdrop: true,
      disposeOnNavigation: true,
      positionStrategy: this._getPositionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.block(),
    });
  }

  private get _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlay.position().global().centerVertically().centerHorizontally();
  }

  private _closeAttachedOverlay(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef.detach();
      this._overlayRef = null;
    }
  }
}
