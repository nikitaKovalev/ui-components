import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiDialogRef } from '@ui-components/kit/ui-dialog';

@Component({
  selector: 'test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent {

  public readonly title: string = this._uiDialogRef.data;

  constructor(
    private readonly _uiDialogRef: UiDialogRef<string>,
  ) {}

  public close(): void {
    this._uiDialogRef.close({ message: 'dialog closed' });
  }

}
