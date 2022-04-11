import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTextBoxModule } from '@ui-components/core/components';
import {
  UiTextBoxController,
  UiTextBoxControllerModule,
} from '@ui-components/core/directives';
import { UiDropdownController, UiDropdownHostModule } from '@ui-components/kit/dropdown-host';

import { UiInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,

    UiTextBoxModule,
    UiTextBoxControllerModule,
    UiDropdownHostModule,
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
export class UiInputModule {}
