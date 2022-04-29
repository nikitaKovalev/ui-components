import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { UiController } from '@ui-components/core/classes';
import { TextBoxSize, TextBoxType } from '@ui-components/core/types';

let _id = 0;

export const BASE_CONTROLLER = new InjectionToken<UiTextBoxController>(
  'base textbox controller',
);

export const TEXTBOX_CONTROLLER = new InjectionToken<UiTextBoxController>(
  `controller over base text field properties:
   [label], [placeholder], [type], [size], [id], [readOnly], [disabled]`,
  { factory: (): UiTextBoxController => new UiTextBoxController() },
);

@Directive({
  selector: `
  [uiTextboxId], 
  [uiTextboxLabel], 
  [uiTextboxPlaceholder], 
  [uiTextboxType], 
  [uiTextboxSize],
  [uiTextboxDisabled],
  ui-input[uiTextboxReadonly],`,
  providers: [
    {
      provide: TEXTBOX_CONTROLLER,
      useExisting: forwardRef(() => UiTextBoxController),
    },
  ],
})
export class UiTextBoxController extends UiController {
  private _readOnly = false;

  private _disabled = false;

  @Input('uiTextboxId')
  id: number = _id++;

  @Input('uiTextboxLabel')
  label = '';

  @Input('uiTextboxPlaceholder')
  placeholder = '';

  @Input('uiTextboxType')
  type: TextBoxType = 'text';

  @Input('uiTextboxSize')
  size: TextBoxSize = 'medium';

  @Input('uiTextboxReadonly')
  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(readonly: boolean | string) {
    this._readOnly = coerceBooleanProperty(readonly);
  }

  @Input('uiTextboxDisabled')
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean | string) {
    this._disabled = coerceBooleanProperty(disabled);
  }
}
