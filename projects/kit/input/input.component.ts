import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiValueAccessor } from '@ui-components/core/classes';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent extends UiValueAccessor {}
