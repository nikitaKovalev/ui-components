import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiProgressBarComponent } from './ui-progress-bar.component';

@NgModule({
  imports: [CommonModule],
  exports: [UiProgressBarComponent],
  declarations: [UiProgressBarComponent],
})
export class UiProgressBarModule {}
