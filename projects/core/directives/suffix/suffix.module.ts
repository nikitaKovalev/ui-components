import { NgModule } from '@angular/core';
import { UiSuffixDirective } from './suffix.directive';

@NgModule({
  declarations: [
    UiSuffixDirective,
  ],
  exports: [
    UiSuffixDirective,
  ],
})
export class UiSuffixModule {}
