import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UiConstContext } from './ui-const.context';

@Directive({ selector: '[uiConst]' })
export class UiConstDirective<T> {
  @Input()
  uiConst!: T;

  constructor(
    @Inject(ViewContainerRef)
    private readonly _viewCRef: ViewContainerRef,
    @Inject(TemplateRef)
    private readonly _tmpRef: TemplateRef<UiConstContext<T>>,
  ) {
    _viewCRef.createEmbeddedView(this._tmpRef, new UiConstContext<T>(this));
  }

  /**
   * Asserts the correct type of the context for the template that `UiConst` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `UiConst` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(
    _dir: UiConstDirective<T>,
    _ctx: any,
  ): _ctx is UiConstDirective<T> {
    return true;
  }
}
