import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiPrefixModule, UiSuffixModule } from '@ui-components/core/directives';
import { UiErrorModule } from '@ui-components/kit/error';
import { UiHintModule } from '@ui-components/kit/hint';
import { UiInputModule } from '@ui-components/kit/input';
import { UiBadgeModule } from '@ui-components/kit/ui-badge';
import { UiButtonModule } from '@ui-components/kit/ui-button';
import { UiConstModule } from '@ui-components/kit/ui-const';
import { UiDialogModule } from '@ui-components/kit/ui-dialog';
import { UI_ICONS, UiIconModule, UiIconService } from '@ui-components/kit/ui-icon';
import { UiMenuModule } from '@ui-components/kit/ui-menu';
import { UiMessageModule } from '@ui-components/kit/ui-message';
import { UiOptionModule } from '@ui-components/kit/ui-option';
import { UiProgressBarModule } from '@ui-components/kit/ui-progress-bar';
import { UiProgressCircleModule } from '@ui-components/kit/ui-progress-circle';
import { UiSidenavModule } from '@ui-components/kit/ui-sidenav';
import { UiTooltipModule } from '@ui-components/kit/ui-tooltip';

import { NavigationComponent, TableComponent, TestDialogComponent } from './components';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,

    UiInputModule,
    UiMessageModule,
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
    UiHintModule,
    UiErrorModule,
    UiPrefixModule,
    UiSuffixModule,

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
