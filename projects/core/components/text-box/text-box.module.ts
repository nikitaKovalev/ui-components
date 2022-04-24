import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiTextBoxComponent } from './text-box.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [UiTextBoxComponent],
  declarations: [UiTextBoxComponent],
})
export class UiTextBoxModule {}
