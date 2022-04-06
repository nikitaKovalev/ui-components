import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Controller } from './controller';
import { TextFieldSize, TextFieldType } from './text-field';

let _id: number = 0;

@Directive({
  selector: `
  [uiTextFieldId], 
  [uiTextFieldLabel], 
  [uiTextFieldPlaceholder], 
  [uiTextFieldType], 
  [uiTextFieldSize],
  [uiTextFieldDisabled],
  ui-input[uiTextFieldReadonly],
  `,
})
export class UiTextFieldController
  extends Controller {
  @Input('uiTextFieldId')
  public id: number = _id++;

  @Input('uiTextFieldLabel')
  public label: string = '';

  @Input('uiTextFieldPlaceholder')
  public placeholder: string = '';

  @Input('uiTextFieldType')
  public type: TextFieldType = 'text';

  @Input('uiTextFieldSize')
  public size: TextFieldSize = 'medium';

  @Input('uiTextFieldReadonly')
  public get readOnly(): boolean {
    return this._readOnly;
  }
  public set readOnly(readonly: boolean | string) {
    this._readOnly = coerceBooleanProperty(readonly);
  }
  private _readOnly: boolean = false;

  @Input('uiTextFieldDisabled')
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(disabled: boolean | string) {
    this._disabled = coerceBooleanProperty(disabled);
  }
  private _disabled: boolean = false;
}
