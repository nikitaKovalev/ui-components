import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type HintPosition = 'start' | 'end';

@Component({
  selector: 'ui-hint',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHintComponent {
  @Input()
  @HostBinding('attr.ui-text-field-hint')
  public align: HintPosition = 'start';
}