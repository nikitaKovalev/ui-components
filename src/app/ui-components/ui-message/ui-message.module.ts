import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMessageComponent } from './ui-message.component';



@NgModule({
  declarations: [
    UiMessageComponent
  ],
  exports: [
    UiMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UiMessageModule { }
