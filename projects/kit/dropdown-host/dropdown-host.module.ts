import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiDropdownHostComponent } from './dropdown-host.component';
import { UiDropdownController } from './dropdown.controller';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    UiDropdownHostComponent,
    UiDropdownController,
  ],
  declarations: [
    UiDropdownHostComponent,
    UiDropdownController,
  ],
})
export class UiDropdownHostModule {}
