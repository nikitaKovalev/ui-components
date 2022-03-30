import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
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
import { LtInputView } from './views/lt-input/lt-input.view';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'input',
        component: InputView,
      },
      {
        path: 'autocomplete',
        component: AutocompleteView,
      },
      {
        path: 'menu',
        component: MenuButtonView,
      },
      {
        path: 'message',
        component: MessageView,
      },
      {
        path: 'table',
        component: TableView,
      },
      {
        path: 'dialog',
        component: DialogView,
      },
      {
        path: 'sidenav',
        component: SidenavView,
      },
      {
        path: 'progress-bar',
        component: ProgressBarView,
      },
      {
        path: 'progress-circle',
        component: ProgressCircleView,
      },
      {
        path: 'button',
        component: ButtonView,
      },
      {
        path: 'const',
        component: ConstView,
      },
      {
        path: 'tooltip',
        component: TooltipView,
      },
      {
        path: 'badge',
        component: BadgeView,
      },
      {
        path: 'lt-input',
        component: LtInputView,
      },
      {
        path: '',
        redirectTo: 'input',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'input',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
