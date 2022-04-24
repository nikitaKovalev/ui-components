import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiButtonComponent } from './ui-button.component';

@NgModule({
  imports: [CommonModule],
  exports: [UiButtonComponent],
  declarations: [UiButtonComponent],
})
export class UiButtonModule {}
