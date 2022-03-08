import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { UiDialogRef } from './ui-dialog-ref';

@Component({
  selector: 'ui-dialog',
  templateUrl: './ui-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDialogComponent {

  public readonly content: Type<any> = this._dialogRef.component;

  constructor(
    private readonly _dialogRef: UiDialogRef,
  ) {}
}
