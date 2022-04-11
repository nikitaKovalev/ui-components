import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiValueAccessor } from './value-accessor.abstract';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent
  extends UiValueAccessor {

  public controlValueChanged(value: unknown): void {
    this.control?.patchValue(value);
  }

}
