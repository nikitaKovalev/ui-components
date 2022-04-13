import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { OVERLAY_CONFIG_PROVIDER } from '@ui-components/core/providers';

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
  providers: OVERLAY_CONFIG_PROVIDER,
})
export class UiDropdownHostModule {}
