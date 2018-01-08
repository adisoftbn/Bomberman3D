import { IBombermanGameRewardStats, IBombermanGameReward } from './gameReward.interface';

export class BombermanGameRewardStats implements IBombermanGameRewardStats {
  maxMovingSpeed = null;
  bombTimeout = null;
  bombPower = null;
  maxBombs = null;
  rewardsIncrease = null;
}

export class BombermanGameReward implements IBombermanGameReward {
  name = 'unknown';
  enabled = false;
  texture = 'test';
  stats = new BombermanGameRewardStats();
}
