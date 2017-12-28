import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CreditsComponent, SettingsComponent, NewGameComponent } from './mainmenu';
import { MenuRoutingModule } from './menu-routing.module';


@NgModule({
  imports: [MenuRoutingModule],
  declarations: [HomeComponent, NewGameComponent, SettingsComponent, CreditsComponent],
  exports: [HomeComponent, NewGameComponent, SettingsComponent, CreditsComponent],
  entryComponents: [],
  providers: []
})
export class MenuModule { }
