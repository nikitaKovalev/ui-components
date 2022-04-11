import { ContentChildren, Directive, forwardRef, InjectionToken, Input, QueryList } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Highlightable } from '@angular/cdk/a11y';

import { identity, merge, NEVER, Observable, startWith, switchMap } from 'rxjs';

import { UiController } from '@ui-components/core/classes';
import { UiOptionComponent } from '@ui-components/kit/ui-option';

export const DROPDOWN_CONTROLLER = new InjectionToken<UiDropdownController>(
  'controller over dropdown',
);

@Directive({
  selector: 'ui-input[uiDropdownEnabled], ui-input[uiTextboxReadonly]',
  providers: [
    {
      provide: DROPDOWN_CONTROLLER,
      useExisting: forwardRef(() => UiDropdownController),
    },
  ],
})
export class UiDropdownController
  extends UiController {
  @Input('uiDropdownEnabled')
  public get enabled(): boolean {
    return this._enabled;
  }
  public set enabled(enabled: boolean | string) {
    this._enabled = coerceBooleanProperty(enabled);
  }
  private _enabled = false;

  @Input('uiTextFieldReadonly')
  public get readOnly(): boolean {
    return this._readOnly;
  }
  public set readOnly(readonly: boolean | string) {
    this._readOnly = coerceBooleanProperty(readonly);
  }
  private _readOnly: boolean = false;

  @Input('uiDropdownDisplayAs')
  public displayAs: Function = identity;

  @ContentChildren(UiOptionComponent)
  public readonly options: QueryList<UiOptionComponent & Highlightable>
    = new QueryList<UiOptionComponent & Highlightable>();

  public get optionSelected$(): Observable<unknown> {
    return this.options.changes.pipe(
      startWith(this.options.toArray()),
      switchMap((options: UiOptionComponent[]) => {
        const click$ = options.map(({ click$ }: UiOptionComponent) => click$ || NEVER);

        return merge(...click$);
      }),
    );
  }

}
