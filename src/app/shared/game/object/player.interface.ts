import { Character } from '../../engine/object';
import { BombermanPlayerStats } from '../model';

export interface IBombermanPlayer {
  character: Character;
  stats: BombermanPlayerStats;
}
