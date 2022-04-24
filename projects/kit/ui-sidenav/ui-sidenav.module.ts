import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSidenavComponent } from './ui-sidenav.component';

@NgModule({
  imports: [CommonModule],
  exports: [UiSidenavComponent],
  declarations: [UiSidenavComponent],
})
export class UiSidenavModule {}
