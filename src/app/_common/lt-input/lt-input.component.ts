import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { LTControlValueAccessor } from './control-value-accessor.abstract';

let _id: number = 0;
type LTInputSize = 'small' | 'medium' | 'large';
type LTInputType = 'text' | 'number' | 'password';

@Component({
  selector: 'lt-input',
  templateUrl: './lt-input.component.html',
  styleUrls: ['./lt-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LtInputComponent
  extends LTControlValueAccessor<string> {

  @Input()
  public id: number = _id++;

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public type: LTInputType = 'text';

  @Input()
  @HostBinding('attr.data-size')
  public size: LTInputSize = 'large';

  @Input()
  public autocomplete: boolean = false;

  protected _getOverrideValue(): string {
    return '';
  }

}
