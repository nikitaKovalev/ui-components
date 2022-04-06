import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { Directive, Inject, Optional, Self } from '@angular/core';

import { identity } from 'rxjs';

@Directive()
export abstract class UiValueAccessor<T = any>
  implements ControlValueAccessor {

  public get invalid(): boolean {
    return this._getNgControlProperty<boolean>('invalid');
  }

  public get touched(): boolean {
    return this._getNgControlProperty<boolean>('invalid');
  }

  public get dirty(): boolean {
    return this._getNgControlProperty<boolean>('dirty');
  }

  public get valid(): boolean {
    return this._getNgControlProperty<boolean>('valid');
  }

  public get disabled(): boolean {
    return this._getNgControlProperty<boolean>('disabled');
  }

  public get control(): AbstractControl {
    return this._getNgControlProperty<AbstractControl>('control');
  }

  public get hasError(): boolean {
    return (this._ngControl && this._ngControl.invalid
      && (this._ngControl.dirty || this._ngControl.touched))
      ?? false;
  }

  public get value(): T {
    return this._value || this.control?.value;
  }
  public set value(value: T | unknown) {
    this._value = value;
  }
  private _value: T | unknown = '';

  private _onChange: Function = identity;
  private _onTouched: Function = () => {};

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    private readonly _ngControl: NgControl,
  ) {
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    } else {
      console.info(
        `If you want to use ${ this.constructor.name } as a Control:
       then add [formControl] or formControlName or [(ngModel)].`
      );
    }
  }

  public writeValue(value: T | unknown) {
    this.value = value;
    this._markAsTouched();
  }

  public registerOnChange(
    onChange: (value: T | unknown) => {},
  ): void {
    this._onChange = (value: T | unknown) => onChange(value);
  }

  public registerOnTouched(
    onTouched: () => void,
  ): void {
    this._onTouched = onTouched;
  }

  public onValueChange(value: T | unknown): void {
    this._onChange(value)
  }

  public onFocusChange(): void {
    this._markAsTouched();
  }

  private _markAsTouched(): void {
    this.control ? this.control.markAsTouched() : null;
  }

  private _getNgControlProperty<Property>(
    property: keyof NgControl,
  ): Property {
    return this._ngControl && this._ngControl[property];
  }

}