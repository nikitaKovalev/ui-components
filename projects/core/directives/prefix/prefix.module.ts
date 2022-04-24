import { NgModule } from '@angular/core';

import { UiPrefixDirective } from './prefix.directive';

@NgModule({
  declarations: [UiPrefixDirective],
  exports: [UiPrefixDirective],
})
export class UiPrefixModule {}
