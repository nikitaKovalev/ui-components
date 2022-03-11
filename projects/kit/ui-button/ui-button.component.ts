import { Component, HostBinding, Input } from '@angular/core';

import { Palette } from '@ui-components/core/types';

@Component({
  selector: 'button[uiButton], button[uiRaisedButton], button[uiIconButton]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent {

  @Input()
  @HostBinding('attr.data-color')
  public color: Omit<Palette, 'default'> = 'default';

}
