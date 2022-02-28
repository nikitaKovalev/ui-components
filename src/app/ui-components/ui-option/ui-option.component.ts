import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-option',
  templateUrl: './ui-option.component.html',
  styleUrls: ['./ui-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOptionComponent {}
