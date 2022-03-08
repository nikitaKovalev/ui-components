import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiDialogComponent } from './ui-dialog.component';
import { UiDialogService } from './services';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    UiDialogComponent,
  ],
  declarations: [
    UiDialogComponent,
  ],
  providers: [
    UiDialogService,
  ]
})
export class UiDialogModule { }
