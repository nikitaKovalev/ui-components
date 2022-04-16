import { ChangeDetectorRef, Provider } from '@angular/core';

import { Observable, takeUntil } from 'rxjs';

import { UiDestroyedService } from '@ui-components/core/services';
import { UiController } from '@ui-components/core/classes';

import { BASE_CONTROLLER, TEXTBOX_CONTROLLER } from './text-box.controller';
import { CLEANER_CONTROLLER, TEXTBOX_CLEANER_CONTROLLER } from './text-box-cleaner.directive';

export const TEXTBOX_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: BASE_CONTROLLER,
    deps: [ TEXTBOX_CONTROLLER, ChangeDetectorRef, UiDestroyedService ],
    useFactory: controllerFactory,
  },
  {
    provide: TEXTBOX_CLEANER_CONTROLLER,
    deps: [ CLEANER_CONTROLLER, ChangeDetectorRef, UiDestroyedService ],
    useFactory: controllerFactory,
  },
];

export function controllerFactory(
  controller: UiController,
  cdRef: ChangeDetectorRef,
  destroyed$: Observable<void>,
): UiController {
  controller.change$
    .pipe(takeUntil(destroyed$))
    .subscribe(() => {
      cdRef.markForCheck();
    });

  return controller;
}