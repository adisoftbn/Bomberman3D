import { IBombermanGameRewardStats, IBombermanGameReward } from './gameReward.interface';

export class BombermanGameRewardStats implements IBombermanGameRewardStats {
  maxMovingSpeed = 0;
  bombTimeout = 0;
  bombPower = 0;
  maxBombs = 0;
  rewardsIncrease = 0;
}

export class BombermanGameReward implements IBombermanGameReward {
  name = 'unknown';
  enabled = false;
  texture = 'test';
  stats = new BombermanGameRewardStats();
}
