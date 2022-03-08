import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Directive, Inject, Optional, Self } from '@angular/core';

type TODO_UNKNOWN = unknown;

/**
 * make writeValue abstract and implement value prop inside your component
 * to reuse this class whenever you need to implement ControlValueAccessor
 * **/
@Directive()
export abstract class UIControlValueAccessor
  implements ControlValueAccessor {

  public value: TODO_UNKNOWN = null;

  public constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    public readonly control: NgControl,
  ) {
    if (control) {
      control.valueAccessor = this;
    }
  }

  public get hasError(): boolean | null {
    if (!this.control) return false;
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  public writeValue(value: TODO_UNKNOWN): void {
    this.value = value;
  }

  public registerOnChange(onChange: () => void) {
    this._onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void) {
    this._onTouched = onTouched;
  }

  public onChange(): void {
    this._onChange(this.value);
  }

  public onFocus(): void {
    if (!this.control) return;
    this.control.control?.markAsTouched();
  }

  protected _onChange = (value: TODO_UNKNOWN): void => {};
  protected _onTouched = (): void => {};

}
