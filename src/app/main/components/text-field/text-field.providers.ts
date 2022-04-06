import { ChangeDetectorRef, InjectionToken, Optional, Provider } from '@angular/core';

import { Observable, takeUntil } from 'rxjs';

import { UiDestroyedService } from '@ui-components/core/services';

import { UiTextFieldController } from './text-field.controller';
import { Controller } from './controller';

export const TEXT_FIELD_CONTROLLER = new InjectionToken<any>(
  'controller over base text field properties: [label], [placeholder], [type], [size], [id]',
);

export const TEXT_FIELD_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: TEXT_FIELD_CONTROLLER,
    deps: [ [ new Optional(), UiTextFieldController ], ChangeDetectorRef, UiDestroyedService ],
    useFactory: textFieldBasePropertiesFactory,
  },
];

export function textFieldBasePropertiesFactory(
  controller: UiTextFieldController | null,
  cdRef: ChangeDetectorRef,
  destroyed$: Observable<void>,
): Controller {
  if (!controller) {
    return new UiTextFieldController();
  }

  controller.change$
    .pipe(takeUntil(destroyed$))
    .subscribe(() => cdRef.markForCheck());

  return controller;
}