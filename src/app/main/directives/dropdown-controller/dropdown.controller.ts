import { ContentChildren, Directive, forwardRef, InjectionToken, Input, QueryList } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { identity, merge, NEVER, Observable, startWith, switchMap } from 'rxjs';

import { UiController } from '../../abstract';
import { UiDropdownOptionComponent } from '../../components/dropdown-option';

export const DROPDOWN_CONTROLLER = new InjectionToken<UiDropdownOptionComponent>(
  'controller over dropdown properties',
);

@Directive({
  selector: 'ui-input[uiDropdownEnabled], ui-input[uiTextFieldReadonly]',
  providers: [
    {
      provide: DROPDOWN_CONTROLLER,
      useExisting: forwardRef(() => UiDropdownOptionComponent),
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

  @ContentChildren(UiDropdownOptionComponent)
  public readonly options: QueryList<UiDropdownOptionComponent & Highlightable>
    = new QueryList<UiDropdownOptionComponent & Highlightable>();

  public get optionSelected$(): Observable<unknown> {
    return this.options.changes.pipe(
      startWith(this.options.toArray()),
      switchMap((options: UiDropdownOptionComponent[]) => {
        const click$ = options.map(({ click$ }: UiDropdownOptionComponent) => click$ || NEVER);

        return merge(...click$);
      }),
    );
  }

}
