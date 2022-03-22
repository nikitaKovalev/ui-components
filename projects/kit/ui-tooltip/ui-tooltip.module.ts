import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiTooltipComponent } from './ui-tooltip.component';
import { UiTooltipDirective } from './ui-tooltip.directive';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    UiTooltipDirective,
  ],
  declarations: [
    UiTooltipComponent,
    UiTooltipDirective,
  ]
})
export class UiTooltipModule {}
