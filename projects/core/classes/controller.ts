import { Directive, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive()
export class UiController implements OnChanges {
  private readonly _change$ = new Subject<void>();

  get change$(): Observable<void> {
    return this._change$.asObservable();
  }

  ngOnChanges(): void {
    this._change$.next();
  }
}
