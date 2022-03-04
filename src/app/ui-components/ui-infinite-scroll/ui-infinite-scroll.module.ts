import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiInfiniteScrollDirective } from './ui-infinite-scroll.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UiInfiniteScrollDirective,
  ],
  declarations: [
    UiInfiniteScrollDirective,
  ]
})
export class UiInfiniteScrollModule {}
