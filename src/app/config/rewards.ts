export const rewardsData = [
  {
    name: 'speed-increase',
    enabled: true,
    texture: 'rewards-speed-increase',
    chances: 1,
    stats: {
      maxMovingSpeed: 1,
    }
  },
  {
    name: 'speed-decrease',
    enabled: true,
    texture: 'rewards-speed-decrease',
    chances: 1,
    stats: {
      maxMovingSpeed: -1,
    }
  },
  {
    name: 'rewards-increase',
    enabled: true,
    texture: 'rewards-rewards-increase',
    chances: 1,
    stats: {
      rewardsIncrease: 1,
    }
  },
  {
    name: 'energy-increase',
    enabled: true,
    texture: 'rewards-energy-increase',
    chances: 1,
    stats: {
      bombPower: 1,
    }
  },
  {
    name: 'energy-decrease',
    enabled: true,
    texture: 'rewards-energy-decrease',
    chances: 1,
    stats: {
      bombPower: -1,
    }
  },
  {
    name: 'detonate-later',
    enabled: true,
    texture: 'rewards-detonate-later',
    chances: 1,
    stats: {
      bombTimeout: 1000,
    }
  },
  {
    name: 'bombs-increase',
    enabled: true,
    texture: 'rewards-bombs-increase',
    chances: 1,
    stats: {
      maxBombs: 1,
    }
  }
];
