
import { IBombermanPlayer, EPlayerCharacterType } from './bombermanPlayer.interface';
export class BombermanPlayer implements IBombermanPlayer {
  name = 'Unknown player';
  playerType = EPlayerCharacterType.ComputerEasy;
  characterName = 'Unknown';
  initialPosition = {
    x: 0,
    y: 0
  };
  characterModel = 'dude';
}
