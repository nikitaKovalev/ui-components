import { ChangeDetectorRef, Optional, Provider } from '@angular/core';

import { Observable, takeUntil } from 'rxjs';

import { UiDestroyedService } from '@ui-components/core/services';

import { DROPDOWN_CONTROLLER, UiDropdownController } from './dropdown.controller';

export const DROPDOWN_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: DROPDOWN_CONTROLLER,
    deps: [ [ new Optional(), UiDropdownController ], ChangeDetectorRef, UiDestroyedService ],
    useFactory: dropdownFactory,
  },
];

export function dropdownFactory(
  controller: UiDropdownController,
  cdRef: ChangeDetectorRef,
  destroyed$: Observable<void>,
): UiDropdownController {
  if (!controller) {
    controller = new UiDropdownController();
  }

  controller.change$
    .pipe(takeUntil(destroyed$))
    .subscribe(() => {
      cdRef.markForCheck();
    });

  return controller;
}