import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiDropdownListComponent } from './dropdown-list.component';
import { UiDropdownList } from './dropdown-list.directive';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    UiDropdownListComponent,
    UiDropdownList,
  ],
  declarations: [
    UiDropdownListComponent,
    UiDropdownList,
  ]
})
export class UiDropdownListModule {}
