import { EventManager } from '@angular/platform-browser';

type EventManagerArgs = ConstructorParameters<typeof EventManager>[0][0];

type EventManagerPlugin = {
  [Key in keyof EventManagerArgs]: EventManagerArgs[Key];
};

export abstract class AbstractEventPlugin implements EventManagerPlugin {
  protected abstract readonly _name: string;

  readonly manager!: EventManager;

  abstract addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function,
  ): Function;

  addGlobalEventListener(
    _target: string,
    _eventName: string,
    _handler: Function,
  ): Function {
    throw new Error(`Global event targets are not supported by ${this._name} plugin`);
  }

  supports(event: string): boolean {
    return event.includes(this._name);
  }

  protected _unwrap(event: string): string {
    return event
      .split('.')
      .filter((value: string) => !this._name.includes(value))
      .join('.');
  }
}
