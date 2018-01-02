import { Vector3 } from 'babylonjs';


import { GameRenderer } from './engine';
import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from './game/model/options';

import { GameBuilder, GameThemes, EGameBuilderEventType } from './game';

import { EPlayerCharacterType, IBombermanGameRules, BombermanGameRules } from './game/model';
import { BombermanPlayerBomb } from './game/object';


class BombermanGameMemoryStorage {
  private _gameBuilder: GameBuilder = null;
  gameThemes: GameThemes = null;
  private _gameRules: IBombermanGameRules = null;

  gameRenderer: GameRenderer = null;
  graphicsOptions: IBombermanGraphicsOptions;


  private _menuBomb: BombermanPlayerBomb = null;

  initGameBuilder() {
    this._gameBuilder = new GameBuilder(gameMemoryStorage.gameRenderer, gameMemoryStorage.graphicsOptions,
      (eventType: EGameBuilderEventType, data: any) => {
        if (eventType === EGameBuilderEventType.currentPlayerKilled) {
          alert('You died!');
        }
      }
    );
    this._gameBuilder.setGameTheme(this.gameThemes.getThemeByName('theme1'));
  }

  createMenuBackground() {
    if (!this._menuBomb) {
      this._menuBomb = new BombermanPlayerBomb(this._gameBuilder, null, new Vector3(0, 0.15, 0));
      this.gameRenderer.getCamera().position.set(0, 0, -11);
      this._menuBomb.getModel().scaling.set(5, 5, 5);
      // this.gameRenderer.getCamera().setTarget(this._menuBomb.getModel().position);
    }

  }

  buildNewGame() {
    if (this._menuBomb) {
      this._menuBomb.destroy()
      this._menuBomb = null;
    }
    this._gameRules = new BombermanGameRules()

    this._gameBuilder.buildBombermanGame(
      [
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.current,
          characterName: 'Unknown',
          characterModel: 'female-mage'
        },
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.computerEasy,
          characterName: 'Unknown',
          characterModel: 'diablous'
        },
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.computerEasy,
          characterName: 'Unknown',
          characterModel: 'female-mage'
        },
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.computerEasy,
          characterName: 'Unknown',
          characterModel: 'rabbit'
        }
      ],
      this.gameThemes.getThemeByName('theme1'),
      {
        width: 11,
        height: 10
      },
      this._gameRules
    );
    // this._gameRenderer.getScene().debugLayer.show();

  }
}


export const gameMemoryStorage = new BombermanGameMemoryStorage();
