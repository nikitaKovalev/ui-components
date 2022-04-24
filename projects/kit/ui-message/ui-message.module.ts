import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UI_ICONS, UiIconModule, UiIconService } from '@ui-components/kit/ui-icon';

import { UiMessageComponent } from './ui-message.component';

@NgModule({
  imports: [CommonModule, UiIconModule],
  exports: [UiMessageComponent],
  declarations: [UiMessageComponent],
})
export class UiMessageModule {
  constructor(private readonly _uiIconSvc: UiIconService) {
    this._uiIconSvc.registry(UI_ICONS);
  }
}
