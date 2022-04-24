import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiDialogRef } from '@ui-components/kit/ui-dialog';

@Component({
  selector: 'test-dialog',
  templateUrl: './test-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent {
  readonly title: string = this._uiDialogRef.data;

  constructor(private readonly _uiDialogRef: UiDialogRef<string>) {}

  close(): void {
    this._uiDialogRef.close({ message: 'dialog closed' });
  }
}
