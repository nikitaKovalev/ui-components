import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiMenuComponent } from './ui-menu.component';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [UiMenuComponent],
  declarations: [UiMenuComponent],
})
export class UiMenuModule {}
