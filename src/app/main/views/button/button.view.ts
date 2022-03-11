import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './button.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonView {}
