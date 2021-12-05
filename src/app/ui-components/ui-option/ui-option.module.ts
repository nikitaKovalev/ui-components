import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiOptionComponent } from './ui-option.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UiOptionComponent,
  ],
  declarations: [
    UiOptionComponent,
  ],
})
export class UiOptionModule { }
