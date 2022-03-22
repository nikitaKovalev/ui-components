import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';

import { Palette } from '@ui-components/core/types';

@Component({
  templateUrl: './ui-tooltip.component.html',
  styleUrls: ['./ui-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipComponent {

  @Input()
  public set value(value: any) {
    value instanceof TemplateRef
      ? this.templateRef = value
      : this.stringRef = value;
  }

  @HostBinding('class.ui-tooltip')
  public applyClass = true;

  @Input()
  @HostBinding('class')
  public get color(): Palette {
    return `ui-tooltip--${this._color}` as Palette;
  }
  public set color(color: Palette) {
    this._color = color;
  }
  private _color: Palette = 'default';

  public templateRef: TemplateRef<any> | null = null;
  public stringRef = '';

}
