import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import {
  AutocompleteView,
  ButtonView,
  DialogView,
  InputView,
  MenuButtonView,
  MessageView,
  ProgressBarView,
  SidenavView,
  TableView,
  ConstView,
} from './views';

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
        path: 'button',
        component: ButtonView,
      },
      {
        path: 'const',
        component: ConstView,
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
