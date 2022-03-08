import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UIControlValueAccessor } from '@ui-components/core';

import { Size } from './ui-input.type';

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
  public size: Size = 'large';

  public readonly id = `ui-autocomplete-${ Math.random() }`;

}
