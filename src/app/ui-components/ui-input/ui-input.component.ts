import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
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
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public size: InputSize = 'large';

  public readonly id = `ui-autocomplete-${ Math.random() }`;

  constructor(
    @Optional()
    @Self()
    control: NgControl
  ) {
    super(control);
  }

}
