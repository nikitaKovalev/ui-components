import { Directive, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';

const EMPTY_FUNCTION = () => {};

@Directive()
export abstract class LTControlValueAccessor<T>
  implements ControlValueAccessor {

  public get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  public get valid(): boolean {
    return this._ngControl?.valid ?? false;
  }

  public get touched(): boolean {
    return this._ngControl?.touched ?? false;
  }

  public get dirty(): boolean {
    return this._ngControl?.dirty ?? false;
  }

  public get control(): AbstractControl | null {
    return this._ngControl?.control ?? null;
  }

  public get hasError(): boolean {
    return (this._ngControl && this._ngControl.invalid
      && (this._ngControl.dirty || this._ngControl.touched))
      ?? false;
  }

  public get value(): T | unknown {
    return this._value;
  }
  public set value(value: T | unknown) {
    this._value = value;
  }
  private _value: T | unknown = null;

  private _onChange: Function = EMPTY_FUNCTION;
  private _onTouched: Function = EMPTY_FUNCTION;

  protected _overrideValue = this._getOverrideValue();

  constructor(
    @Optional()
    @Self()
    private readonly _ngControl: NgControl,
  ) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    } else {
      console.info(
        `There is no NgControl for ${ this.constructor.name }. 
        Use [(ngModel)] or [formControl] or formControlName for correct work.`
      );
    }
  }

  public writeValue(value: T | unknown): void {
    this.value = value;
  }

  public registerOnChange(
    onChange: (value: T | unknown) => void,
  ): void {
    this._onChange = (value: T | unknown) => onChange(value);
  }

  public registerOnTouched(
    onTouched: () => void,
  ): void {
    this._onTouched = onTouched;
  }

  public onChange(value: T | unknown): void {
    this._onChange(value);
  }

  protected abstract _getOverrideValue(): T;

}