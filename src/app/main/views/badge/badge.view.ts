import { ChangeDetectionStrategy, Component } from '@angular/core';

import { startWith, takeWhile, timer } from 'rxjs';

@Component({
  templateUrl: 'badge.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeView {

  public counter$ = timer(120, 500).pipe(
    startWith(0),
    takeWhile((count: number) => count <= 50),
  )

  public hidden = false;

  public toggle(): void {
    this.hidden = !this.hidden;
  }

}