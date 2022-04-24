import { ChangeDetectorRef, Provider } from '@angular/core';
import { controllerFactory } from '@ui-components/core/factories';
import { UiDestroyedService } from '@ui-components/core/services';

import { DROPDOWN, DROPDOWN_CONTROLLER } from './dropdown.controller';

const DROPDOWN_FACTORY = controllerFactory;
export const DROPDOWN_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: DROPDOWN,
    deps: [DROPDOWN_CONTROLLER, ChangeDetectorRef, UiDestroyedService],
    useFactory: DROPDOWN_FACTORY,
  },
];
