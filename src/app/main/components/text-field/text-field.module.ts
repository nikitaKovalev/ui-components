import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiTextFieldComponent } from './text-field.component';
import { UiTextFieldController } from './text-field.controller';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UiTextFieldComponent,
    UiTextFieldController,
  ],
  declarations: [
    UiTextFieldComponent,
    UiTextFieldController,
  ],
})
export class UiTextFieldModule {}
