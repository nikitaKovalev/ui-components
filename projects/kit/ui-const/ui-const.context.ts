import { UiConstDirective } from './ui-const.directive';

export class UiConstContext<T> {

  constructor(
    private readonly internalDirectiveInstance: UiConstDirective<T>,
  ) {}

  public get $implicit(): T {
    return this.internalDirectiveInstance.uiConst;
  }

  public get uiConst(): T {
    return this.internalDirectiveInstance.uiConst;
  }

}