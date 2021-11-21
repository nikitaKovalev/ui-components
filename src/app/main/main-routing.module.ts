import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { InputComponent, MenuButtonComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'input',
        component: InputComponent,
      },
      {
        path: 'menu-button',
        component: MenuButtonComponent,
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
