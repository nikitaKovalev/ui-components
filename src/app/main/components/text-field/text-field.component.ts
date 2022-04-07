import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { TEXT_FIELD_CONTROLLER, TEXT_FIELD_PROVIDERS } from './text-field.providers';
import { UiTextFieldController } from './text-field.controller';
import { fadeInMessages } from './text-field.animations';

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: [
    './text-field.component.scss',
    './text-field.messages.scss',
  ],
  animations: [ fadeInMessages ],
  host: {
    'class': 'ui-text-field',
    '[class.--focused]': 'focused',
    '[class.--filled]': 'filled',
    '[class.--invalid]': 'invalid',
    '[class.--disabled]': 'disabled',
    '[attr.ui-text-field-size]': 'controller.size',
    '(focusin)': 'focused = true',
    '(focusout)': 'focused = false; focusChange.emit()',
  },
  providers: TEXT_FIELD_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextFieldComponent {

  @Input()
  public value: string = '';

  @Input()
  public invalid: boolean = false;

  @Input('disabled')
  public _disabled: boolean = false;

  @Output()
  public readonly focusChange = new EventEmitter<void>();

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  public focused: boolean = false;

  constructor(
    @Inject(TEXT_FIELD_CONTROLLER)
    public readonly controller: UiTextFieldController,
  ) {}

  public get filled(): boolean {
    return !!this.value;
  }

  public get disabled(): boolean {
    return this._disabled || this.controller.disabled;
  }

  public onValueChange(): void {
    this.valueChange.emit(this.value);
  }

}
