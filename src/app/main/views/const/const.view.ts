import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, Observable, startWith, takeWhile } from 'rxjs';

@Component({
  templateUrl: './const.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstView {
  readonly value$: Observable<number> = interval(300).pipe(
    startWith(0),
    takeWhile((interval: number) => interval <= 100),
  );
}
