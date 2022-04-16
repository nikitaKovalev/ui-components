import { ChangeDetectorRef, Provider } from '@angular/core';

import { UiDestroyedService } from '@ui-components/core/services';
import { controllerFactory } from '@ui-components/core/factories';

import { DROPDOWN, DROPDOWN_CONTROLLER } from './dropdown.controller';

const DROPDOWN_FACTORY = controllerFactory;
export const DROPDOWN_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: DROPDOWN,
    deps: [ DROPDOWN_CONTROLLER, ChangeDetectorRef, UiDestroyedService ],
    useFactory: DROPDOWN_FACTORY,
  },
];
