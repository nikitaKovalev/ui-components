import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

let _id: number = 0;
type LTHintPosition = 'start' | 'end';

@Component({
  selector: 'lt-hint',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LtHintComponent {

  @Input()
  @HostBinding('attr.lt-hint-align')
  public align: LTHintPosition = 'start';

  @HostBinding('attr.lt-hint-id')
  private _id: number = _id++;

}
