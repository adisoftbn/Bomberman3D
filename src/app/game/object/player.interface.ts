import { Character } from '../../shared/engine/object';
import { BombermanPlayerStats } from '../model';

export interface IBombermanPlayer {
  character: Character;
  stats: BombermanPlayerStats;
}
