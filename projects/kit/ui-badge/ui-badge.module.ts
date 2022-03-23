import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiBadgeDirective } from './ui-badge.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    UiBadgeDirective,
  ],
  declarations: [
    UiBadgeDirective,
  ]
})
export class UiBadgeModule {}
