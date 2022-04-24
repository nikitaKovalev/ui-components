import { Injectable } from '@angular/core';

import { AbstractEventPlugin } from './abstract.plugin';

/**
 * Stop propagation of the event.
 * example:
 *
 * <button (click.stop)="notPropagated()">
 *   Click on this button won't bubble the event.
 * </button>
 **/
@Injectable()
export class StopPropagationEventPlugin extends AbstractEventPlugin {
  protected _name = '.stop';

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const stopPropagation = (event: Event) => {
      event.stopPropagation();
      handler(event);
    };

    return this.manager.addEventListener(
      element,
      this._unwrap(eventName),
      stopPropagation,
    );
  }

  override addGlobalEventListener(
    target: string,
    eventName: string,
    handler: Function,
  ): Function {
    const stopPropagation = (event: Event) => {
      event.stopPropagation();
      handler(event);
    };

    return this.manager.addGlobalEventListener(
      target,
      this._unwrap(eventName),
      stopPropagation,
    );
  }
}
