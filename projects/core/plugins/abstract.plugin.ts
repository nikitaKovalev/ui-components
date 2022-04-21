import { EventManager } from '@angular/platform-browser';

type EventManagerArgs = ConstructorParameters<typeof EventManager>[0][0];
type EventManagerPlugin = {
  [Key in keyof EventManagerArgs]: EventManagerArgs[Key];
};

export abstract class AbstractEventPlugin
  implements EventManagerPlugin {

  public readonly manager!: EventManager;

  protected abstract readonly _name: string;

  public supports(event: string): boolean {
    return event.includes(this._name);
  }

  public abstract addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function,
  ): Function;

  public addGlobalEventListener(
    target: string,
    eventName: string,
    handler: Function,
  ): Function {
    throw new Error(
      `Global event targets are not supported by ${ this._name } plugin`,
    );
  }

  protected _unwrap(event: string): string {
    return event
      .split('.')
      .filter((value: string) => !this._name.includes(value))
      .join('.');
  }

}

