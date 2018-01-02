import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { CreditsComponent, SettingsComponent, NewGameComponent } from './mainmenu';
import { MenuRoutingModule } from './menu-routing.module';


@NgModule({
  imports: [CommonModule, MenuRoutingModule],
  declarations: [HomeComponent, NewGameComponent, SettingsComponent, CreditsComponent],
  exports: [HomeComponent, NewGameComponent, SettingsComponent, CreditsComponent],
  entryComponents: [],
  providers: []
})
export class MenuModule { }
