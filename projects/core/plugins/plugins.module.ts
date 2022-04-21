import { Inject, NgModule } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { OutsideEventPlugin } from './outside.plugin';
import { PreventDefaultEventPlugin } from './prevent.plugin';
import { StopPropagationEventPlugin } from './stop.plugin';

@NgModule({
  providers: [
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: OutsideEventPlugin,
      multi: true,
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: PreventDefaultEventPlugin,
      multi: true,
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: StopPropagationEventPlugin,
      multi: true,
    },
  ],
})
export class UiPluginsModule {
  public static initialized = false;

  constructor(@Inject(EVENT_MANAGER_PLUGINS) plugins: readonly unknown[]) {
    console.assert(
      !(plugins[0] instanceof OutsideEventPlugin) || UiPluginsModule.initialized,
      'EventPluginsModule must come after BrowserModule in imports',
    );

    UiPluginsModule.initialized = true;
  }
}
