import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { AutocompleteView, InputView, MenuButtonView, MessageView, TableView } from './views';

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
        path: 'menu-button',
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
