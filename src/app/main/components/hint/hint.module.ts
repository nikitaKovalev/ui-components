import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiHintComponent } from './hint.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    UiHintComponent,
  ],
  declarations: [
    UiHintComponent,
  ]
})
export class UiHintModule {}
