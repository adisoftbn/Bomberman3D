import { BombermanGameReward, IBombermanGameReward } from './model';


export class BombermanGameRewards {
  private _rewards = {};
  private _rewardslist = [];

  constructor() {
  }

  public initGameRewards(rewardsData) {
    rewardsData.forEach(reward => {
      const newRewardItem = new BombermanGameReward();
      newRewardItem.name = reward.name;
      newRewardItem.enabled = reward.enabled;
      newRewardItem.texture = reward.texture;
      if (typeof newRewardItem.stats.maxMovingSpeed !== 'undefined') {
        newRewardItem.stats.maxMovingSpeed = reward.stats.maxMovingSpeed;
      }
      if (typeof newRewardItem.stats.bombTimeout !== 'undefined') {
        newRewardItem.stats.bombTimeout = reward.stats.bombTimeout;
      }
      if (typeof newRewardItem.stats.bombPower !== 'undefined') {
        newRewardItem.stats.bombPower = reward.stats.bombPower;
      }
      if (typeof newRewardItem.stats.maxBombs !== 'undefined') {
        newRewardItem.stats.maxBombs = reward.stats.maxBombs;
      }
      if (typeof newRewardItem.stats.rewardsIncrease !== 'undefined') {
        newRewardItem.stats.rewardsIncrease = reward.stats.rewardsIncrease;
      }
      this._rewards[reward.name] = newRewardItem;
      if (newRewardItem.enabled) {
        if (reward.chances) {
          for (let i = 1; i <= reward.chances; i++) {
            this._rewardslist.push(newRewardItem);
          }
        } else {
          this._rewardslist.push(newRewardItem);
        }
      }
    });
  }

  getRewardByName(rewardName) {
    if (this._rewards[rewardName]) {
      return this._rewards[rewardName];
    } else {
      throw new Error(`Theme ${rewardName} cannot be found!`);
    }
  }

  getRandomReward() {
    const randomList = this.shuffle(this._rewardslist);
    return randomList[
      Math.floor(Math.random() * randomList.length)
    ];
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
