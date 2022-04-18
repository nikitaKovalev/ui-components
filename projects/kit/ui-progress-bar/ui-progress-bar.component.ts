import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'progress[uiProgressBar]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./ui-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressBarComponent {

  @Input()
  @HostBinding('attr.data-color')
  public color = 'primary';

  @Input()
  @HostBinding('attr.data-size')
  public size: 'small' | 'medium' | 'large' = 'large';

  @Input()
  @HostBinding('attr.data-mode')
  public mode: 'determinate' | 'indeterminate' = 'determinate';

}
