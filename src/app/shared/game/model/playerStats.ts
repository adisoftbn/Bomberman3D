import { IBombermanPlayerStats } from './playerStats.interface';
import { IBombermanGameReward } from './gameReward.interface';

export class BombermanPlayerStats implements IBombermanPlayerStats {
  movingSpeed = 1;
  maxMovingSpeed = 1;
  bombTimeout = 4000;
  bombPower = 1;
  bombFlareTimeout = 300;
  bombFlareCleanUpTimeout = 200;
  maxBombs = 1;
  currentBombsCount = 0;
  rewardsIncrease = 0;

  addGameReward(gameReward: IBombermanGameReward) {
    if (typeof gameReward.stats.bombPower !== 'undefined') {
      this.bombPower += gameReward.stats.bombPower;
      if (this.bombPower < 1) {
        this.bombPower = 1;
      }
    }
    if (typeof gameReward.stats.bombTimeout !== 'undefined') {
      this.bombTimeout += gameReward.stats.bombTimeout;
      if (this.bombTimeout < 1000) {
        this.bombTimeout = 1000;
      }
    }
    if (typeof gameReward.stats.maxBombs !== 'undefined') {
      this.maxBombs += gameReward.stats.maxBombs;
      if (this.maxBombs < 1) {
        this.maxBombs = 1;
      }
    }
    if (typeof gameReward.stats.maxMovingSpeed !== 'undefined') {
      this.maxMovingSpeed += gameReward.stats.maxMovingSpeed;
      if (this.maxMovingSpeed < 0.2) {
        this.maxMovingSpeed = 0.2;
      }
    }
    if (typeof gameReward.stats.rewardsIncrease !== 'undefined') {
      this.rewardsIncrease += gameReward.stats.rewardsIncrease;
      if (this.rewardsIncrease < 0) {
        this.rewardsIncrease = 0;
      }
    }
  }
}
