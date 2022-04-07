import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { UiMessageModule } from '@ui-components/kit/ui-message';
import { UiAutocompleteModule } from '@ui-components/kit/ui-autocomplete';
import { UiMenuModule } from '@ui-components/kit/ui-menu';
import { UiOptionModule } from '@ui-components/kit/ui-option';
import { UiDialogModule } from '@ui-components/kit/ui-dialog';
import { UiSidenavModule } from '@ui-components/kit/ui-sidenav';
import { UiProgressBarModule } from '@ui-components/kit/ui-progress-bar';
import { UiProgressCircleModule } from '@ui-components/kit/ui-progress-circle';
import { UiButtonModule } from '@ui-components/kit/ui-button';
import { UI_ICONS, UiIconModule, UiIconService } from '@ui-components/kit/ui-icon';
import { UiConstModule } from '@ui-components/kit/ui-const';
import { UiTooltipModule } from '@ui-components/kit/ui-tooltip';
import { UiBadgeModule } from '@ui-components/kit/ui-badge';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent, TableComponent, TestDialogComponent } from './components';
import {
  AutocompleteView,
  BadgeView,
  ButtonView,
  ConstView,
  DialogView,
  InputView,
  MenuButtonView,
  MessageView,
  ProgressBarView,
  ProgressCircleView,
  SidenavView,
  TableView,
  TooltipView,
} from './views';

import { UiTextFieldModule } from './components/text-field';
import { UiInputModule } from './components/input';
import { UiHintModule } from './components/hint';
import { UiErrorModule } from './components/error';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,

    UiTextFieldModule,

    UiMessageModule,
    UiAutocompleteModule,
    UiMenuModule,
    UiOptionModule,
    UiDialogModule,
    UiSidenavModule,
    UiProgressBarModule,
    UiProgressCircleModule,
    UiButtonModule,
    UiIconModule,
    UiConstModule,
    UiTooltipModule,
    UiBadgeModule,

    MainRoutingModule,

    UiInputModule,
    UiHintModule,
    UiErrorModule,
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
    ProgressCircleView,
    ButtonView,
    ConstView,
    TooltipView,
    BadgeView,
  ],
})
export class MainModule {
  constructor(private readonly _uiIconSvc: UiIconService) {
    this._uiIconSvc.registry(UI_ICONS);
  }
}
