import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    UiErrorComponent,
  ],
  declarations: [
    UiErrorComponent,
  ]
})
export class UiErrorModule {}
