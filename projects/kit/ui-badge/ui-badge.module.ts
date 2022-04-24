import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiBadgeDirective } from './ui-badge.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UiBadgeDirective],
  declarations: [UiBadgeDirective],
})
export class UiBadgeModule {}
