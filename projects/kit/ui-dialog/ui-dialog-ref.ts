import { Inject, Injectable, OnDestroy, Type } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TODO_ANY } from '@ui-components/core/types';

@Injectable({ providedIn: 'root' })
export class UiDialogRef<T = any>
  implements OnDestroy {

  public get component(): Type<any> {
    return this._component;
  }

  public get data(): T {
    return this._data;
  }

  public get afterClosed$(): Observable<TODO_ANY> {
    return this._afterClosed$.asObservable();
  }

  private readonly _afterClosed$ = new Subject<TODO_ANY>();
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly _overlayRef: OverlayRef,
    @Inject('dialog component')
    private readonly _component: Type<any>,
    @Inject('dialog data')
    private readonly _data: any,
  ) {
    this._subBackDropClick();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public close(data?: TODO_ANY): void {
    this._close(data);
  }

  private _close(data?: TODO_ANY): void {
    this._overlayRef.dispose();

    this._afterClosed$.next(data);
    this._afterClosed$.complete();
  }

  private _subBackDropClick(): void {
    this._overlayRef.backdropClick()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => this._close(null));
  }

}