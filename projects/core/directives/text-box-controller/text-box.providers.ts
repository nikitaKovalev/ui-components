import { ChangeDetectorRef, Provider } from '@angular/core';
import { controllerFactory } from '@ui-components/core/factories';
import { UiDestroyedService } from '@ui-components/core/services';

import { BASE_CONTROLLER, TEXTBOX_CONTROLLER } from './text-box.controller';
import {
  CLEANER_CONTROLLER,
  TEXTBOX_CLEANER_CONTROLLER,
} from './text-box-cleaner.directive';

const BASE_FACTORY = controllerFactory;
const CLEANER_FACTORY = controllerFactory;

export const TEXTBOX_PROVIDERS: Provider[] = [
  UiDestroyedService,
  {
    provide: BASE_CONTROLLER,
    deps: [TEXTBOX_CONTROLLER, ChangeDetectorRef, UiDestroyedService],
    useFactory: BASE_FACTORY,
  },
  {
    provide: TEXTBOX_CLEANER_CONTROLLER,
    deps: [CLEANER_CONTROLLER, ChangeDetectorRef, UiDestroyedService],
    useFactory: CLEANER_FACTORY,
  },
];
