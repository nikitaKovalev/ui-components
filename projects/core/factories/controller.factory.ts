import { ChangeDetectorRef } from '@angular/core';
import { UiController } from '@ui-components/core/classes';
import { Observable, takeUntil } from 'rxjs';

export function controllerFactory(
  controller: UiController,
  cdRef: ChangeDetectorRef,
  destroyed$: Observable<void>,
): UiController {
  controller.change$.pipe(takeUntil(destroyed$)).subscribe(() => {
    cdRef.markForCheck();
  });

  return controller;
}
