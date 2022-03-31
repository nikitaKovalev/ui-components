import { Directive, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';

const EMPTY_FUNCTION = () => {};

@Directive()
export abstract class AbstractValueAccessor<T>
  implements ControlValueAccessor {

  public get invalid(): boolean {
    return this._getNgControlProperty<boolean>('invalid');
  }

  public get valid(): boolean {
    return this._getNgControlProperty<boolean>('valid');
  }

  public get touched(): boolean {
    return this._getNgControlProperty<boolean>('touched');
  }

  public get dirty(): boolean {
    return this._getNgControlProperty<boolean>('dirty');
  }

  public get control(): AbstractControl | null {
    return this._getNgControlProperty<AbstractControl>('control');
  }

  public get hasError(): boolean {
    return (this._ngControl && this._ngControl.invalid
      && (this._ngControl.dirty || this._ngControl.touched))
      ?? false;
  }

  public get value(): T | unknown {
    return this._value || this.control?.value;
  }
  public set value(value: T | unknown) {
    this._value = value;
  }
  private _value: T | unknown = null;

  private _onChange: Function = EMPTY_FUNCTION;
  private _onTouched: Function = EMPTY_FUNCTION;

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

  public onBlur(): void {
    this.control ? this.control.markAsTouched() : null;
  }

  private _getNgControlProperty<T>(
    property: keyof NgControl,
  ): T {
    return this._ngControl && this._ngControl[property];
  }

}