import { Directive, OnChanges } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
export class UiController
  implements OnChanges {

  public readonly change$ = new Subject<void>();

  public ngOnChanges(): void {
    this.change$.next();
  }

}