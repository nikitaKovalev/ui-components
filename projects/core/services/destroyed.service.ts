import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UiDestroyedService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
