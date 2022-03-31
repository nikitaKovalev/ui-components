import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LtInputComponent } from './lt-input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    LtInputComponent,
  ],
  declarations: [
    LtInputComponent,
  ]
})
export class LtInputModule {}
