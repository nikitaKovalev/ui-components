import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiTextFieldComponent } from './text-field.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UiTextFieldComponent,
  ],
  declarations: [
    UiTextFieldComponent,
  ],
})
export class UiTextFieldModule {}
