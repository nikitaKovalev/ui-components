import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { Palette } from '@ui-components/core/types';

@Component({
  templateUrl: './ui-tooltip.component.html',
  styleUrls: ['./ui-tooltip.component.scss'],
  host: {
    class: 'ui-tooltip',
    '[class.ui-tooltip--]': 'color',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipComponent {
  private _color: Palette = 'default';

  @Input()
  set value(value: TemplateRef<NgTemplateOutlet> | string | null) {
    value instanceof TemplateRef ? (this.templateRef = value) : (this.stringRef = value);
  }

  @Input()
  get color(): Palette {
    return this._color;
  }

  set color(color: Palette) {
    this._color = color;
  }

  templateRef: TemplateRef<unknown> | null = null;
  stringRef: string | null = '';
}
