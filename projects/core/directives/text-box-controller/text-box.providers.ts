import { ChangeDetectorRef, Optional, Provider } from '@angular/core';

import { Observable, takeUntil } from 'rxjs';

import { UiDestroyedService } from '@ui-components/core/services';

import { TEXTBOX_CONTROLLER, UiTextBoxController } from './text-box.controller';

export const TEXTBOX_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: TEXTBOX_CONTROLLER,
    deps: [ [ new Optional(), UiTextBoxController ], ChangeDetectorRef, UiDestroyedService ],
    useFactory: textboxFactory,
  },
];

export function textboxFactory(
  controller: UiTextBoxController,
  cdRef: ChangeDetectorRef,
  destroyed$: Observable<void>,
): UiTextBoxController {
  if (!controller) {
    controller = new UiTextBoxController();
  }

  controller.change$
    .pipe(takeUntil(destroyed$))
    .subscribe(() => {
      cdRef.markForCheck();
    });

  return controller;
}