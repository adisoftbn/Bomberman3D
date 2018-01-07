export interface IBombermanGameRewardStats {
  maxMovingSpeed: number;
  bombTimeout: number;
  bombPower: number;
  maxBombs: number;
  rewardsIncrease: number;
}

export interface IBombermanGameReward {
  name: string;
  enabled: boolean;
  texture: string,
  stats: IBombermanGameRewardStats;
}
