import { Injectable } from '@angular/core';

import { AbstractEventPlugin } from './abstract.plugin';

/**
 * Prevents the default behaviour of event.
 * example:
 *
 * <button (click.stop)="onPreventDefault()">
 *   Click on this button won't will prevent the default behaviour of MouseEvent click.
 * </button>
 **/
@Injectable()
export class PreventDefaultEventPlugin extends AbstractEventPlugin {
  protected _name = '.prevent';

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const preventDefault = (event: Event) => {
      event.preventDefault();
      handler(event);
    };

    return this.manager.addEventListener(
      element,
      this._unwrap(eventName),
      preventDefault,
    );
  }

  override addGlobalEventListener(
    target: string,
    eventName: string,
    handler: Function,
  ): Function {
    const preventDefault = (event: Event) => {
      event.stopPropagation();
      handler(event);
    };

    return this.manager.addGlobalEventListener(
      target,
      this._unwrap(eventName),
      preventDefault,
    );
  }
}
