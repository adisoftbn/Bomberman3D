import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewGameComponent, SettingsComponent, CreditsComponent } from './mainmenu';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'new-game', component: NewGameComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'credits', component: CreditsComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
