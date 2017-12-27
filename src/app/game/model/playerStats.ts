import { IBombermanPlayerStats } from './playerStats.interface';

export class BombermanPlayerStats implements IBombermanPlayerStats {
  movingSpeed = 1;
  bombTimeout = 5000;
  bombPower = 1;
}
