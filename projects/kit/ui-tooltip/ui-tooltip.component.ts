import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  TemplateRef,
} from '@angular/core';
import { Palette } from '@ui-components/core/types';

@Component({
  templateUrl: './ui-tooltip.component.html',
  styleUrls: ['./ui-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipComponent {
  private _color: Palette = 'default';

  @HostBinding('class.ui-tooltip')
  applyClass = true;

  templateRef: TemplateRef<any> | null = null;
  stringRef = '';

  @Input()
  set value(value: any) {
    value instanceof TemplateRef ? (this.templateRef = value) : (this.stringRef = value);
  }

  @Input()
  @HostBinding('class')
  get color(): Palette {
    return `ui-tooltip--${this._color}` as Palette;
  }

  set color(color: Palette) {
    this._color = color;
  }
}
