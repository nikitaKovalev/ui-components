import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiButtonComponent } from './ui-button.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    UiButtonComponent,
  ],
  declarations: [
    UiButtonComponent,
  ]
})
export class UiButtonModule {}
