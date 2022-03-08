import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent {}
