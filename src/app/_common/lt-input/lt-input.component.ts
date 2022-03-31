import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { AbstractValueAccessor } from './abstract-value-accessor';
import { fadeInMessages } from './lt-messages.animation';

let _id: number = 0;
type LTInputSize = 'small' | 'medium' | 'large';
type LTInputType = 'text' | 'number' | 'password';

@Component({
  selector: 'lt-input',
  templateUrl: './lt-input.component.html',
  styleUrls: [
    './lt-input.component.scss',
    './lt-messages.scss',
  ],
  animations: [ fadeInMessages ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LtInputComponent
  extends AbstractValueAccessor<string> {

  @Input()
  public id: number = _id++;

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public type: LTInputType = 'text';

  @Input()
  @HostBinding('attr.lt-input-size')
  public size: LTInputSize = 'large';

  @Input()
  public autocomplete: boolean = false;

}
