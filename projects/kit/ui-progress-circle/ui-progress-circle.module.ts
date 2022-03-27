import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiProgressCircleComponent } from './ui-progress-circle.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UiProgressCircleComponent,
  ],
  declarations: [
    UiProgressCircleComponent,
  ]
})
export class UiProgressCircleModule {}
