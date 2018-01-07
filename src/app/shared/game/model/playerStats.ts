import { IBombermanPlayerStats } from './playerStats.interface';

export class BombermanPlayerStats implements IBombermanPlayerStats {
  movingSpeed = 1;
  maxMovingSpeed = 1;
  bombTimeout = 5000;
  bombPower = 1;
  bombFlareTimeout = 300;
  bombFlareCleanUpTimeout = 200;
  maxBombs = 1;
  currentBombsCount = 0;
  rewardsIncrease = 0;
}
