import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LtInputComponent } from './lt-input.component';
import { LtHintComponent } from './lt-hint.component';
import { LtErrorComponent } from './lt-error.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    LtInputComponent,
    LtHintComponent,
    LtErrorComponent,
  ],
  declarations: [
    LtInputComponent,
    LtHintComponent,
    LtErrorComponent,
  ]
})
export class LtInputModule {}
