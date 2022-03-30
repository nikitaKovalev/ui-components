import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let _id: number = 0;

@Component({
  selector: 'lt-input',
  templateUrl: './lt-input.component.html',
  styleUrls: ['./lt-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LtInputComponent {

  @Input()
  public id: number = _id++;

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public autocomplete: boolean = false;

  @Input()
  @HostBinding('attr.data-size')
  public size: 'small' | 'medium' | 'large' = 'large';

}
