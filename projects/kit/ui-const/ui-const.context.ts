import { UiConstDirective } from './ui-const.directive';

export class UiConstContext<T> {
  constructor(private readonly internalDirectiveInstance: UiConstDirective<T>) {}

  get $implicit(): T {
    return this.internalDirectiveInstance.uiConst;
  }

  get uiConst(): T {
    return this.internalDirectiveInstance.uiConst;
  }
}
