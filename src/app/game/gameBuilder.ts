import { IBombermanPlayer } from './models/bombermanPlayer.interface';
import { IBombermanGameTheme } from './models/bombermanGameTheme.interface';
import { IBombermanGameSize } from './models/bombermanGameSize.interface';
import { GameRenderer } from '../shared/engine';
export class GameBuilder {
  constructor(private gameRenderer: GameRenderer) {

  }

  buildBombermanGame(players: IBombermanPlayer[], gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {

  }
}
