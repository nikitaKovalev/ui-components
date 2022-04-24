import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DialogConfig, UiDialogService } from '@ui-components/kit/ui-dialog';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TestDialogComponent } from '../../components';

@Component({
  templateUrl: './dialog.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogView implements OnDestroy {
  private readonly _destroyed$ = new Subject<void>();

  constructor(private readonly _uiDialogSvc: UiDialogService) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  openDialog(): void {
    const dialogConfig: DialogConfig = {
      data: 'any data could be here',
    };

    const dialogRef = this._uiDialogSvc.open(TestDialogComponent, dialogConfig);

    dialogRef.afterClosed$.pipe(filter(Boolean), takeUntil(this._destroyed$)).subscribe();
  }
}
