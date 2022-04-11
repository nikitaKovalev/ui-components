import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { UiController } from '@ui-components/core/classes';
import { TextBoxType, TextBoxSize } from '@ui-components/core/types';

let _id: number = 0;

export const TEXTBOX_CONTROLLER = new InjectionToken<UiTextBoxController>(
  `controller over base text field properties:
   [label], [placeholder], [type], [size], [id], [readOnly], [disabled]`,
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
export class UiTextBoxController
  extends UiController {
  @Input('uiTextboxId')
  public id: number = _id++;

  @Input('uiTextboxLabel')
  public label: string = '';

  @Input('uiTextboxPlaceholder')
  public placeholder: string = '';

  @Input('uiTextboxType')
  public type: TextBoxType = 'text';

  @Input('uiTextboxSize')
  public size: TextBoxSize = 'medium';

  @Input('uiTextboxReadonly')
  public get readOnly(): boolean {
    return this._readOnly;
  }
  public set readOnly(readonly: boolean | string) {
    this._readOnly = coerceBooleanProperty(readonly);
  }
  private _readOnly: boolean = false;

  @Input('uiTextboxDisabled')
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(disabled: boolean | string) {
    this._disabled = coerceBooleanProperty(disabled);
  }
  private _disabled: boolean = false;
}
