import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { UiController } from '@ui-components/core/classes';

export const TEXTBOX_CLEANER_CONTROLLER = new InjectionToken(
  'Textbox cleaner controller',
);

export const CLEANER_CONTROLLER = new InjectionToken<UiTextBoxCleanerDirective>(
  'Textbox cleaner',
  { factory: () => new UiTextBoxCleanerDirective() },
);

@Directive({
  selector: 'ui-input[uiTextboxCleaner]',
  providers: [
    {
      provide: CLEANER_CONTROLLER,
      useExisting: forwardRef(() => UiTextBoxCleanerDirective),
    },
  ],
})
export class UiTextBoxCleanerDirective extends UiController {
  @Input('uiTextboxCleaner')
  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(hasCleaner: boolean | string) {
    this._enabled = coerceBooleanProperty(hasCleaner);
  }

  private _enabled = false;
}
