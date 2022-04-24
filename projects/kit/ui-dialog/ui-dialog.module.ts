import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiDialogService } from './services';
import { UiDialogComponent } from './ui-dialog.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [UiDialogComponent],
  declarations: [UiDialogComponent],
  providers: [UiDialogService],
})
export class UiDialogModule {}
