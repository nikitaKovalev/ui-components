import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { fade, fadeIn } from '@ui-components/core/animations';
import {
  TEXTBOX_CONTROLLER,
  TEXTBOX_PROVIDERS,
  UiTextBoxCleanerDirective,
  UiTextBoxController,
} from '@ui-components/core/directives';
import { CLEANER_CONTROLLER } from '@ui-components/core/directives/text-box-controller';

@Component({
  selector: 'ui-textbox',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss', './text-box.messages.scss'],
  animations: [fadeIn, fade],
  host: {
    class: 'ui-textbox',
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
  value = '';

  @Input()
  invalid = false;

  @Input('disabled')
  _disabled = false;

  @Output()
  readonly focusChange = new EventEmitter<void>();

  @Output()
  readonly valueChange = new EventEmitter<string>();

  @ViewChild('inputRef', { static: true })
  readonly input!: ElementRef<HTMLInputElement>;

  focused = false;

  constructor(
    @Inject(TEXTBOX_CONTROLLER)
    readonly controller: UiTextBoxController,
    @Inject(CLEANER_CONTROLLER)
    private readonly _cleaner: UiTextBoxCleanerDirective,
  ) {}

  get filled(): boolean {
    return !!this.value;
  }

  get disabled(): boolean {
    return this._disabled || this.controller.disabled;
  }

  get hasCleaner(): boolean {
    return this._cleaner.enabled && this.filled && !this.disabled;
  }

  onClean(): void {
    this.value = '';
    this.onValueChange();
  }

  onValueChange(): void {
    this.valueChange.emit(this.value);
  }

  _onClick(): void {
    this.input.nativeElement.focus();
  }

  _onFocus(focused: boolean): void {
    this.focused = focused;
    if (!this.focused) this.focusChange.emit();
  }
}
