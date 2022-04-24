import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiDialogRef } from './ui-dialog-ref';

@Component({
  selector: 'ui-dialog',
  template: `
    <ng-container *ngComponentOutlet="dialogRef.component"></ng-container>
  `,
  styleUrls: ['ui-dialog.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDialogComponent {
  constructor(readonly dialogRef: UiDialogRef) {}
}
