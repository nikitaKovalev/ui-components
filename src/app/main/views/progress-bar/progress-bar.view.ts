import { ChangeDetectionStrategy, Component } from '@angular/core';

import { repeat, startWith, takeWhile, timer } from 'rxjs';

@Component({
  templateUrl: './progress-bar.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarView {
  public readonly value$ = timer(300, 50)
    .pipe(
      startWith(0),
      takeWhile((value: number) => value <= 100),
      repeat(),
    );
}
