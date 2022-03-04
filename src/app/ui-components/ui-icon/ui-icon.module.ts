import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiIconComponent } from './ui-icon.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UiIconComponent,
  ],
  exports: [
    UiIconComponent
  ]
})
export class UiIconModule {}
