import { NgModule } from '@angular/core';

import { UiTextBoxController } from './text-box.controller';
import { UiTextBoxCleanerDirective } from './text-box-cleaner.directive';

@NgModule({
  exports: [
    UiTextBoxController,
    UiTextBoxCleanerDirective,
  ],
  declarations: [
    UiTextBoxController,
    UiTextBoxCleanerDirective,
  ],
})
export class UiTextBoxControllerModule {}
