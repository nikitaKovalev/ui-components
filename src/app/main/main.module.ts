import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { UiInputModule } from '@ui-components/kit/ui-input';
import { UiMessageModule } from '@ui-components/kit/ui-message';
import { UiAutocompleteModule } from '@ui-components/kit/ui-autocomplete';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent, TableComponent } from './components';
import { InputView, MenuButtonView, MessageView, TableView } from './views';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,

    UiInputModule,
    UiMessageModule,
    UiAutocompleteModule,

    MainRoutingModule,
  ],
  declarations: [
    MainComponent,

    NavigationComponent,
    TableComponent,

    InputView,
    MenuButtonView,
    MessageView,
    TableView,
  ],
})
export class MainModule {}
