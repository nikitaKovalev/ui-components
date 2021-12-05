import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiAutocompleteComponent } from './ui-autocomplete.component';
import { UiAutocompleteDirective } from './ui-autocomplete.directive';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    UiAutocompleteComponent,
    UiAutocompleteDirective,
  ],
  declarations: [
    UiAutocompleteComponent,
    UiAutocompleteDirective,
  ],
})
export class UiAutocompleteModule { }
