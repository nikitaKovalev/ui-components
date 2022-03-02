import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiAutocompleteComponent } from './ui-autocomplete.component';
import { UiAutocompleteDirective } from './ui-autocomplete.directive';
import { UiOptionComponent } from './ui-option/ui-option.component';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    UiAutocompleteComponent,
    UiAutocompleteDirective,
    UiOptionComponent,
  ],
  declarations: [
    UiAutocompleteComponent,
    UiAutocompleteDirective,
    UiOptionComponent,
  ],
})
export class UiAutocompleteModule {}
