import { Injectable } from '@angular/core';

import { AbstractEventPlugin } from './abstract.plugin';

/**
 * Call event handler outside Angular NgZone
 * example:
 *
 * <button (click.outside)="onOutsideOfNgZone()">
 *   Click on this button won't trigger change detection.
 * </button>
 **/
@Injectable()
export class OutsideEventPlugin extends AbstractEventPlugin {
  protected _name = '.outside';

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    return this.manager
      .getZone()
      .runOutsideAngular(() =>
        this.manager.addEventListener(element, this._unwrap(eventName), handler),
      );
  }

  override addGlobalEventListener(
    target: string,
    eventName: string,
    handler: Function,
  ): Function {
    return this.manager
      .getZone()
      .runOutsideAngular(() =>
        this.manager.addGlobalEventListener(target, this._unwrap(eventName), handler),
      );
  }
}
