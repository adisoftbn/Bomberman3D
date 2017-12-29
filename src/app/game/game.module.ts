import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  imports: [GameRoutingModule],
  declarations: [GameComponent],
  exports: [GameComponent],
  entryComponents: [],
  providers: []
})
export class GameModule { }
