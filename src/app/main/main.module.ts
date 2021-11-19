import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiInputModule } from '@ui-components/ui-input';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent, InputComponent, MenuButtonComponent } from './components';


@NgModule({
  imports: [
    CommonModule,

    UiInputModule,

    MainRoutingModule,
  ],
  declarations: [
    MainComponent,

    NavigationComponent,
    InputComponent,
    MenuButtonComponent,
  ],
})
export class MainModule {}
