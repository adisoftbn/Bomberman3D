
import { IBombermanPlayerModel, EPlayerCharacterType } from './playerModel.interface';
export class BombermanPlayerModel implements IBombermanPlayerModel {
  name = 'Unknown player';
  playerType = EPlayerCharacterType.computerEasy;
  characterName = 'Unknown';
  characterModel = 'dude';
}
