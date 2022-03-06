import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UI_ICONS, UiIconModule, UiIconService } from '@libs/ui-icon';

import { UiMessageComponent } from './ui-message.component';


@NgModule({
  imports: [
    CommonModule,

    UiIconModule,
  ],
  exports: [
    UiMessageComponent
  ],
  declarations: [
    UiMessageComponent
  ]
})
export class UiMessageModule {

  constructor(
    private readonly _uiIconService: UiIconService,
  ) {
    this._uiIconService.registry(UI_ICONS);
  }

}
