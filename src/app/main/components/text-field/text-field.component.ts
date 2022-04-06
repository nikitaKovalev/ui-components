import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';

import { TEXT_FIELD_CONTROLLER, TEXT_FIELD_PROVIDERS } from './text-field.providers';
import { UiTextFieldController } from './text-field.controller';

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  host: {
    'class': 'ui-text-field',
    '[class.--focused]': 'focused',
    '[class.--filled]': 'filled',
    '[attr.ui-text-field-size]': 'controller.size',
    '(focusin)': 'focused = true',
    '(focusout)': 'focused = false',
  },
  providers: TEXT_FIELD_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextFieldComponent {

  @Output()
  public readonly valueChanges = new EventEmitter<string>();
  public value: string = '';

  public focused: boolean = false;

  constructor(
    @Inject(TEXT_FIELD_CONTROLLER)
    public readonly controller: UiTextFieldController,
  ) {}

  public get filled(): boolean {
    return !!this.value;
  }

  public onValueChange(): void {
    this.valueChanges.emit(this.value);
  }

}
