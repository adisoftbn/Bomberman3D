import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewGameComponent, SettingsComponent, CreditsComponent } from './mainmenu';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'new-game', component: NewGameComponent, pathMatch: 'full' },
      { path: 'new-game/:gameType', component: NewGameComponent, pathMatch: 'full' },
      { path: 'new-game/:gameType/:room', component: NewGameComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
      { path: 'settings/:category', component: SettingsComponent, pathMatch: 'full' },
      { path: 'credits', component: CreditsComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
