import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OVERLAY_CONFIG_PROVIDER } from '@ui-components/core/providers';

import { UiDropdownController } from './dropdown.controller';
import { UiDropdownHostComponent } from './dropdown-host.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [UiDropdownHostComponent, UiDropdownController],
  declarations: [UiDropdownHostComponent, UiDropdownController],
  providers: OVERLAY_CONFIG_PROVIDER,
})
export class UiDropdownHostModule {}
