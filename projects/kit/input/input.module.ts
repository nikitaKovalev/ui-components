import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTextBoxModule } from '@ui-components/core/components';
import {
  UiTextBoxController,
  UiTextBoxControllerModule,
} from '@ui-components/core/directives';
import { UiDropdownController, UiDropdownHostModule } from '@ui-components/kit/dropdown-host';
import { UI_ICONS, UiIconModule, UiIconService } from '@ui-components/kit/ui-icon';

import { UiInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,

    UiTextBoxModule,
    UiTextBoxControllerModule,
    UiDropdownHostModule,
    UiIconModule,
  ],
  exports: [
    UiInputComponent,
    UiTextBoxController,
    UiDropdownController,
  ],
  declarations: [
    UiInputComponent,
  ],
})
export class UiInputModule {
  constructor(private readonly _svc: UiIconService) {
    this._svc.registry(UI_ICONS);
  }
}
