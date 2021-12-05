import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  Optional,
  Renderer2,
  Self,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';

import { fromEvent, take, takeUntil } from 'rxjs';

import { UiAutocompleteComponent } from './ui-autocomplete.component';
import { UiAutocompleteOverlay } from './ui-autocomplete.overlay';
import { UiInputComponent } from '../ui-input/ui-input.component';

@Directive({
  selector: '[uiAutocomplete]'
})
export class UiAutocompleteDirective
  extends UiAutocompleteOverlay
  implements AfterViewInit {

  @Input()
  public uiAutocomplete: UiAutocompleteComponent | null = null;

  constructor(
    _elRef: ElementRef,
    _renderer: Renderer2,
    _viewCRef: ViewContainerRef,
    _overlay: Overlay,
    @Optional()
    @Self()
    private readonly _ngControl: NgControl,
    private readonly _cdRef: ChangeDetectorRef,
    @Optional()
    private readonly _uiInput: UiInputComponent,
  ) {
    super(_elRef, _renderer, _viewCRef, _overlay);
  }

  public ngAfterViewInit(): void {
    this.templateRef = this.uiAutocomplete?.templateRef as TemplateRef<any>;
    this._subInputFocused();
  }

  public subOptionSelected(): void {
    this.uiAutocomplete?.optionSelected$()
      .pipe(
        take(1),
        takeUntil(this.destroyed$),
      )
      .subscribe((value: unknown) => {
        this.close();

        const displayValue = this.uiAutocomplete?.displayWith(value);

        this._ngControl?.control?.patchValue(value);

        if (this._uiInput) {
          this._uiInput.value = displayValue;
        } else {
          this.elRef.nativeElement.value = displayValue || '';
        }


        this._cdRef.markForCheck();
      });
  }

  private _subInputFocused(): void {
    fromEvent(this.elRef.nativeElement, 'focus')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.open();

        this.subOptionSelected();
      })
  }

}
