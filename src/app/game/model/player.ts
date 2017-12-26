
import { IBombermanPlayerModel, EPlayerCharacterType } from './player.interface';
export class BombermanPlayer implements IBombermanPlayerModel {
  name = 'Unknown player';
  playerType = EPlayerCharacterType.computerEasy;
  characterName = 'Unknown';
  characterModel = 'dude';
}
