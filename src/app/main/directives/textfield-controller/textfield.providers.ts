import { ChangeDetectorRef, InjectionToken, Optional, Provider } from '@angular/core';

import { Observable, takeUntil } from 'rxjs';

import { UiDestroyedService } from '@ui-components/core/services';

import { UiTextfieldController } from './textfield.controller';

export const TEXTFIELD_CONTROLLER = new InjectionToken<UiTextfieldController>(
  `controller over base text field properties:
   [label], [placeholder], [type], [size], [id], [readOnly], [disabled]`,
  { factory: () => new UiTextfieldController() },
);

export const TEXTFIELD_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: TEXTFIELD_CONTROLLER,
    deps: [ [ new Optional(), UiTextfieldController ], ChangeDetectorRef, UiDestroyedService ],
    useFactory: textfieldBasPropertiesFactory,
  }
];

export function textfieldBasPropertiesFactory(
  controller: UiTextfieldController,
  cdRef: ChangeDetectorRef,
  destroyed$: Observable<void>,
): UiTextfieldController {
  if (!controller) {
    controller = new UiTextfieldController();
  }

  controller.change$
    .pipe(takeUntil(destroyed$))
    .subscribe(() => cdRef.markForCheck());

  return controller;
}