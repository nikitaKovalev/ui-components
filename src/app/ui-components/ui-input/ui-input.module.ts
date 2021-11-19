import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiInputComponent } from './ui-input.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    UiInputComponent,
  ],
  declarations: [
    UiInputComponent,
  ],
})
export class UiInputModule {}
