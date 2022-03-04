import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiIconModule } from '@ui-components/ui-icon';

import { UiMessageComponent } from './ui-message.component';


@NgModule({
  imports: [
    CommonModule,

    UiIconModule,
  ],
  exports: [
    UiMessageComponent
  ],
  declarations: [
    UiMessageComponent
  ]
})
export class UiMessageModule { }
