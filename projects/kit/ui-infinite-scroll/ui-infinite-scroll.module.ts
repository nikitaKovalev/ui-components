import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiInfiniteScrollDirective } from './ui-infinite-scroll.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UiInfiniteScrollDirective],
  declarations: [UiInfiniteScrollDirective],
})
export class UiInfiniteScrollModule {}
