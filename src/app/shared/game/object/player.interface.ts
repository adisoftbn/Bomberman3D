import { Character } from '../../engine/object';
import { BombermanPlayerStats } from '../model';

export interface IBombermanPlayer {
  _character: Character;
  stats: BombermanPlayerStats;
}
