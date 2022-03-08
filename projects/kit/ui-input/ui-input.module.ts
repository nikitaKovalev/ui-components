import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiInputComponent } from './ui-input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UiInputComponent,
  ],
  declarations: [
    UiInputComponent,
  ],
})
export class UiInputModule {}
