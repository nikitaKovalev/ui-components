import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-progress-circle',
  templateUrl: './ui-progress-circle.component.html',
  styleUrls: ['./ui-progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressCircleComponent {

  @Input()
  public value: number | null = 0;

  @Input()
  public max = 1;

  @Input()
  @HostBinding('style.--ui-progress-circle-color')
  public color: string | null = null;

  @Input()
  @HostBinding('attr.data-size')
  @HostBinding('style.--ui-progress-circle-size')
  public size: 'xs' | 'small' | 'medium' | 'large'  = 'medium';

  @Input()
  @HostBinding('attr.data-mode')
  public mode: 'determinate' | 'indeterminate' = 'indeterminate';

  @HostBinding('style.--ui-progress-circle-percentage')
  public get progressPercentage(): number {
    return <number>this.value / this.max;
  }

}
