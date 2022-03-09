import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
