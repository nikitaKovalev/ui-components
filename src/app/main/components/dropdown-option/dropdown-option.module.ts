import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiDropdownOptionComponent } from './dropdown-option.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    UiDropdownOptionComponent,
  ],
  declarations: [
    UiDropdownOptionComponent,
  ]
})
export class UiDropdownOptionModule {}
