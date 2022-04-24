import { Highlightable } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ContentChildren,
  Directive,
  forwardRef,
  InjectionToken,
  Input,
  QueryList,
} from '@angular/core';
import { UiController } from '@ui-components/core/classes';
import { UiOptionComponent } from '@ui-components/kit/ui-option';
import { identity, merge, NEVER, Observable, startWith, switchMap } from 'rxjs';

export const DROPDOWN = new InjectionToken<UiDropdownController>(
  'dropdown host UiDropdownController',
);

export const DROPDOWN_CONTROLLER = new InjectionToken<UiDropdownController>(
  'controller over dropdown',
  { factory: () => new UiDropdownController() },
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
export class UiDropdownController extends UiController {
  private _enabled = false;

  private _readOnly = false;

  @Input('uiDropdownEnabled')
  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(enabled: boolean | string) {
    this._enabled = coerceBooleanProperty(enabled);
  }

  @Input('uiTextboxReadonly')
  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(readonly: boolean | string) {
    this._readOnly = coerceBooleanProperty(readonly);
  }

  @Input('uiDropdownDisplayAs')
  displayAs: Function = identity;

  @ContentChildren(UiOptionComponent)
  readonly options: QueryList<UiOptionComponent & Highlightable> = new QueryList<
    UiOptionComponent & Highlightable
  >();

  get optionSelected$(): Observable<unknown> {
    return this.options.changes.pipe(
      startWith(this.options.toArray()),
      switchMap((options: UiOptionComponent[]) => {
        const click$ = options.map(({ click$ }: UiOptionComponent) => click$ || NEVER);

        return merge(...click$);
      }),
    );
  }
}
