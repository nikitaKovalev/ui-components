import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTextFieldModule } from '../text-field';
import { UiTextfieldController, UiTextfieldControllerModule } from '../../directives/textfield-controller';

import { UiInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,

    UiTextFieldModule,
    UiTextfieldControllerModule,
  ],
  exports: [
    UiInputComponent,
    UiTextfieldController,
  ],
  declarations: [
    UiInputComponent,
  ],
})
export class UiInputModule { }
