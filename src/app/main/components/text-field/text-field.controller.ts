import { Directive, Input } from '@angular/core';

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
}
