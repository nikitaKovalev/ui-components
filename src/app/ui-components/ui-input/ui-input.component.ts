import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { UIControlValueAccessor } from './ui-input-control-value-accessor';
import { InputSize } from './ui-input.type';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent
  extends UIControlValueAccessor {

  @Input()
  public placeholder = '';

  @Input()
  public size: InputSize = 'large';

  constructor(control: NgControl) {
    super(control);
  }

}
