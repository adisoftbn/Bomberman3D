export const rewardsData = [
  {
    name: 'speed-increase',
    title: 'Moving speed up',
    enabled: true,
    texture: 'rewards-speed-increase',
    chances: 1,
    stats: {
      maxMovingSpeed: 1,
    }
  },
  {
    name: 'speed-decrease',
    title: 'Moving speed down',
    enabled: true,
    texture: 'rewards-speed-decrease',
    chances: 1,
    stats: {
      maxMovingSpeed: -1,
    }
  },
  {
    name: 'rewards-increase',
    title: 'More rewards',
    enabled: true,
    texture: 'rewards-rewards-increase',
    chances: 1,
    stats: {
      rewardsIncrease: 1,
    }
  },
  {
    name: 'energy-increase',
    title: 'More energy',
    enabled: true,
    texture: 'rewards-energy-increase',
    chances: 10,
    stats: {
      bombPower: 1,
    }
  },
  {
    name: 'energy-decrease',
    title: 'Less energy',
    enabled: true,
    texture: 'rewards-energy-decrease',
    chances: 5,
    stats: {
      bombPower: -1,
    }
  },
  {
    name: 'detonate-later',
    title: 'Detonate later',
    enabled: true,
    texture: 'rewards-detonate-later',
    chances: 5,
    stats: {
      bombTimeout: 1000,
    }
  },
  {
    name: 'bombs-increase',
    title: 'More bombs',
    enabled: true,
    texture: 'rewards-bombs-increase',
    chances: 10,
    stats: {
      maxBombs: 1,
    }
  }
];
