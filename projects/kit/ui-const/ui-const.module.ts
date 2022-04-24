import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiConstDirective } from './ui-const.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UiConstDirective],
  declarations: [UiConstDirective],
})
export class UiConstModule {}
