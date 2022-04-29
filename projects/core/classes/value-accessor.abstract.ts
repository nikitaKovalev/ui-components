import { ChangeDetectorRef, Directive, Inject, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';

export const EMPTY_FUNCTION: Function = () => {};

@Directive()
export abstract class UiValueAccessor<T = never> implements ControlValueAccessor {
  get invalid(): boolean {
    return this._getNgControlProperty<boolean>('invalid');
  }

  get touched(): boolean {
    return this._getNgControlProperty<boolean>('touched');
  }

  get dirty(): boolean {
    return this._getNgControlProperty<boolean>('dirty');
  }

  get valid(): boolean {
    return this._getNgControlProperty<boolean>('valid');
  }

  get disabled(): boolean {
    return this._getNgControlProperty<boolean>('disabled');
  }

  get control(): AbstractControl {
    return this._getNgControlProperty<AbstractControl>('control');
  }

  get hasError(): boolean {
    return (this.control && this.invalid && (this.dirty || this.touched)) ?? false;
  }

  get value(): T {
    return this._value as T;
  }

  set value(value: T | unknown) {
    this._value = value;
    this._cdRef.detectChanges();
  }

  private _value: T | unknown = '';
  private _onChange = EMPTY_FUNCTION;
  private _onTouched = EMPTY_FUNCTION;

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    private readonly _ngControl: NgControl,
    @Inject(ChangeDetectorRef)
    private readonly _cdRef: ChangeDetectorRef,
  ) {
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    } else {
      console.info(
        `If you want to use ${this.constructor.name} as a Control:
       then add [formControl] or formControlName or [(ngModel)].`,
      );
    }
  }

  writeValue(value: T | unknown): void {
    this.value = value;
    if (value) this._markAsTouched();
  }

  registerOnChange(onChange: (value: T | unknown) => void): void {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }

  onValueChange(value: T | unknown): void {
    this._onChange(value);
  }

  onFocusChange(): void {
    this._markAsTouched();
  }

  private _markAsTouched(): void {
    this.control ? this._onTouched() : null;
  }

  private _getNgControlProperty<Property>(property: keyof NgControl): Property {
    return this._ngControl && this._ngControl[property];
  }
}
