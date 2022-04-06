import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTextFieldModule } from '../text-field';

import { UiInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,

    UiTextFieldModule,
  ],
  exports: [
    UiInputComponent,
  ],
  declarations: [
    UiInputComponent,
  ],
})
export class UiInputModule { }
