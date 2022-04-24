import { Directive, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class UiController implements OnChanges {
  readonly change$ = new Subject<void>();

  ngOnChanges(): void {
    this.change$.next();
  }
}
