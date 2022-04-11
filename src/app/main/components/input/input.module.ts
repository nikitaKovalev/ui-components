import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTextFieldModule } from '../text-field';
import { UiTextfieldController, UiTextfieldControllerModule } from '../../directives/textfield-controller';
import { UiDropdownListModule } from '../dropdown-list';
import { UiDropdownController, UiDropdownControllerModule } from '../../directives/dropdown-controller';

import { UiInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,

    UiTextFieldModule,
    UiTextfieldControllerModule,
    UiDropdownListModule,
    UiDropdownControllerModule,
  ],
  exports: [
    UiInputComponent,
    UiTextfieldController,
    UiDropdownController,
  ],
  declarations: [
    UiInputComponent,
  ],
})
export class UiInputModule { }
