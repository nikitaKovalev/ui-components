import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { UiInputModule } from '@ui-components/kit/ui-input';
import { UiMessageModule } from '@ui-components/kit/ui-message';
import { UiAutocompleteModule } from '@ui-components/kit/ui-autocomplete';
import { UiMenuModule } from '@ui-components/kit/ui-menu';
import { UiOptionModule } from '@ui-components/kit/ui-option';
import { UiDialogModule } from '@ui-components/kit/ui-dialog';
import { UiSidenavModule } from '@ui-components/kit/ui-sidenav';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent, TableComponent, TestDialogComponent } from './components';
import { AutocompleteView, DialogView, InputView, MenuButtonView, MessageView, SidenavView, TableView } from './views';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,

    UiInputModule,
    UiMessageModule,
    UiAutocompleteModule,
    UiMenuModule,
    UiOptionModule,
    UiDialogModule,
    UiSidenavModule,

    MainRoutingModule,
  ],
  declarations: [
    MainComponent,

    NavigationComponent,
    TableComponent,
    TestDialogComponent,

    InputView,
    MenuButtonView,
    MessageView,
    TableView,
    AutocompleteView,
    DialogView,
    SidenavView,
  ],
})
export class MainModule {}
