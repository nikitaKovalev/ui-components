import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, repeat, startWith, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'progress-circle-view',
  templateUrl: 'progress-circle.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleView {

  public readonly value$ = timer(300, 300)
    .pipe(
      startWith(0),
      takeWhile((value: number) => value <= 100),
      repeat(),
    )

}