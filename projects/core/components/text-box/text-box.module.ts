import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiTextBoxComponent } from './text-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UiTextBoxComponent,
  ],
  declarations: [
    UiTextBoxComponent,
  ],
})
export class UiTextBoxModule {}
