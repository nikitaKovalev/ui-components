import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LtInputComponent } from './lt-input.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    LtInputComponent,
  ],
  declarations: [
    LtInputComponent,
  ]
})
export class LtInputModule {}
