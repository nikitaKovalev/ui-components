import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import {
  UiTextBoxController,
  TEXTBOX_PROVIDERS,
  TEXTBOX_CONTROLLER,
} from '@ui-components/core/directives';

import { fadeIn } from '@ui-components/core/animations';


@Component({
  selector: 'ui-textbox',
  templateUrl: './text-box.component.html',
  styleUrls: [
    './text-box.component.scss',
    './text-box.messages.scss',
  ],
  animations: [ fadeIn ],
  host: {
    'class': 'ui-textbox',
    '[class.--focused]': 'focused',
    '[class.--filled]': 'filled',
    '[class.--invalid]': 'invalid',
    '[class.--disabled]': 'disabled',
    '[attr.ui-textbox-size]': 'controller.size',
    '(focusin)': 'focused = true',
    '(focusout)': 'focused = false; focusChange.emit()',
  },
  providers: TEXTBOX_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextBoxComponent {

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
    @Inject(TEXTBOX_CONTROLLER)
    public readonly controller: UiTextBoxController,
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
