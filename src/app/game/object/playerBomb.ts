import { Vector3 } from 'babylonjs';

import { Sphere } from '../../shared/engine/object';

import { GameBuilder } from '../';
import { IBombermanPlayerStats } from '../model';


export class BombermanPlayerBomb {
  private _gameBuilder: GameBuilder;
  constructor(gameBuilder: GameBuilder, playerStats: IBombermanPlayerStats, position: Vector3, doneCallback: Function) {
    this._gameBuilder = gameBuilder;
    const sphere = new Sphere(this._gameBuilder.getGameRenderer(), new Vector3(position.x, 0.15, position.z), 0.3, {
      shadowEnabled: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowEnabled,
      shadowQuality: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowQuality
    });
    sphere.setTextureFromGallery('test');
    const scaleInterval = setInterval(() => {

    }, 5);
    setTimeout(() => {
      sphere.destroy();
      doneCallback();
    }, 3000);

  }
}

