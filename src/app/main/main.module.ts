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
import { UiProgressBarModule } from '@ui-components/kit/ui-progress-bar';
import { UiButtonModule } from '@ui-components/kit/ui-button';
import { UI_ICONS, UiIconModule, UiIconService } from '@ui-components/kit/ui-icon';
import { UiConstModule } from '@ui-components/kit/ui-const';
import { UiTooltipModule } from '@ui-components/kit/ui-tooltip';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent, TableComponent, TestDialogComponent } from './components';
import {
  AutocompleteView,
  DialogView,
  InputView,
  MenuButtonView,
  MessageView,
  ProgressBarView,
  SidenavView,
  TableView,
  ButtonView,
  ConstView,
  TooltipView,
} from './views';


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
    UiProgressBarModule,
    UiButtonModule,
    UiIconModule,
    UiConstModule,
    UiTooltipModule,

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
    ProgressBarView,
    ButtonView,
    ConstView,
    TooltipView,
  ],
})
export class MainModule {
  constructor(private readonly _uiIconSvc: UiIconService) {
    this._uiIconSvc.registry(UI_ICONS);
  }
}
