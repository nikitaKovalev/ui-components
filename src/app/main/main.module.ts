import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent } from './components';


@NgModule({
  imports: [
    CommonModule,

    MainRoutingModule,
  ],
  exports: [],
  declarations: [
    MainComponent,

    NavigationComponent,
  ],
})
export class MainModule {}
