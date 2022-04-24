import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'progress[uiProgressBar]',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./ui-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressBarComponent {
  @Input()
  @HostBinding('attr.data-color')
  color = 'primary';

  @Input()
  @HostBinding('attr.data-size')
  size: 'small' | 'medium' | 'large' = 'large';

  @Input()
  @HostBinding('attr.data-mode')
  mode: 'determinate' | 'indeterminate' = 'determinate';
}
