import { UiConstDirective } from './ui-const.directive';

export class UiConstContext<T> {
  constructor(private readonly _internalDirectiveInstance: UiConstDirective<T>) {}

  get $implicit(): T {
    return this._internalDirectiveInstance.uiConst;
  }

  get uiConst(): T {
    return this._internalDirectiveInstance.uiConst;
  }
}
