import { Inject, Injectable, OnDestroy, Type } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogCloseType } from './types';
import { AfterClosed } from './interfaces';

@Injectable({ providedIn: 'root' })
export class UiDialogRef<T = any>
  implements OnDestroy {

  public get component(): Type<any> {
    return this._component;
  }

  public get data(): T {
    return this._data;
  }

  public get afterClosed$(): Observable<any> {
    return this._afterClosed$.asObservable();
  }

  private readonly _afterClosed$ = new Subject<AfterClosed<T>>();
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _overlayRef: OverlayRef,
    @Inject('dialog component')
    private readonly _component: Type<any>,
    @Inject('dialog data')
    private readonly _data: T,
  ) {
    this._subBackDropClick();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public close(data?: T): void {
    this._close('close', data);
  }

  private _close(type: DialogCloseType, data?: T | undefined | null): void {
    this._overlayRef.dispose();

    this._afterClosed$.next({ type, data });
    this._afterClosed$.complete();
  }

  private _subBackDropClick(): void {
    this._overlayRef.backdropClick()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => this._close('backdropClick', null));
  }

}