import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import {
  TEXTBOX_CONTROLLER,
  TEXTBOX_PROVIDERS,
  UiTextBoxCleanerDirective,
  UiTextBoxController,
} from '@ui-components/core/directives';
import { CLEANER_CONTROLLER } from '@ui-components/core/directives/text-box-controller';

import { fade, fadeIn } from '@ui-components/core/animations';


@Component({
  selector: 'ui-textbox',
  templateUrl: './text-box.component.html',
  styleUrls: [
    './text-box.component.scss',
    './text-box.messages.scss',
  ],
  animations: [ fadeIn, fade ],
  host: {
    'class': 'ui-textbox',
    '[class.--focused]': 'focused',
    '[class.--filled]': 'filled',
    '[class.--invalid]': 'invalid',
    '[class.--disabled]': 'disabled',
    '[attr.ui-textbox-size]': 'controller.size',
    '(focusin)': '_onFocus(true)',
    '(focusout)': '_onFocus(false)',
    '(click)': '_onClick()',
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

  @ViewChild('inputRef', { static: true })
  public readonly input!: ElementRef<HTMLInputElement>;

  public focused: boolean = false;

  constructor(
    @Inject(TEXTBOX_CONTROLLER)
    public readonly controller: UiTextBoxController,
    @Inject(CLEANER_CONTROLLER)
    private readonly _cleaner: UiTextBoxCleanerDirective,
  ) {}

  public get filled(): boolean {
    return !!this.value;
  }

  public get disabled(): boolean {
    return this._disabled || this.controller.disabled;
  }

  public get hasCleaner(): boolean {
    return this._cleaner.enabled && this.filled && !this.disabled;
  }

  public onClean(): void {
    this.value = '';
    this.onValueChange();
  }

  public onValueChange(): void {
    this.valueChange.emit(this.value);
  }

  public _onClick(): void {
    this.input.nativeElement.focus();
  }

  public _onFocus(focused: boolean): void {
    this.focused = focused;
    if (!this.focused) this.focusChange.emit();
  }

}
