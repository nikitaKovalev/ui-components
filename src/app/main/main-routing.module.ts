import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { InputView, MenuButtonView } from './views';

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
        path: 'menu-button',
        component: MenuButtonView,
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
