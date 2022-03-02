import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiInputModule } from '@ui-components/ui-input';
import { UiAutocompleteModule } from '@ui-components/ui-autocomplete';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent } from './components';
import { InputView, MenuButtonView } from './views';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    UiInputModule,
    UiAutocompleteModule,

    MainRoutingModule,
  ],
  declarations: [
    MainComponent,

    NavigationComponent,

    InputView,
    MenuButtonView,
  ],
})
export class MainModule {}
