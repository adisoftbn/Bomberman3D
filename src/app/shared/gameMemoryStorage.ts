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
  private _gameMode = null;

  public keyPressCallback(event) {
    if (this._gameBuilder) {
      this._gameBuilder.keyPressCallback(event);
    }
  }

  public keyUpCallback(event) {
    if (this._gameBuilder) {
      this._gameBuilder.keyUpCallback(event);
    }
  }

  public keyDownCallback(event) {
    if (this._gameBuilder) {
      this._gameBuilder.keyDownCallback(event);
    }
  }


  initGameBuilder() {
    if (!this._gameBuilder) {
      this._gameBuilder = new GameBuilder(gameMemoryStorage.gameRenderer, gameMemoryStorage.graphicsOptions,
        (eventType: EGameBuilderEventType, data: any) => {
          if (eventType === EGameBuilderEventType.currentPlayerKilled) {

          }
        }
      );
    }
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
  destroyMenuBackground() {
    if (this._menuBomb) {
      this._menuBomb.destroy();
      this._menuBomb = null;
    }
  }

  buildDemoGame() {
    this.destroyMenuBackground();
    this._gameRules = new BombermanGameRules()

    this._gameBuilder.buildBombermanGame(
      [
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.current,
          characterName: 'Unknown',
          characterModel: 'rabbit'
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

  buildNewGame(mapSize, players = [], themeName) {
    this.destroyMenuBackground();
    const newWidth = 6 + mapSize * Math.round(Math.random() * 4);
    const newHeight = 6 + mapSize * Math.round(Math.random() * 4);
    this._gameRules = new BombermanGameRules()
    this._gameBuilder.buildBombermanGame(
      players,
      this.gameThemes.getThemeByName(themeName),
      {
        width: newWidth,
        height: newHeight
      },
      this._gameRules
    );
    // this._gameRenderer.getScene().debugLayer.show();
  }

  enterMenuMode() {
    if (this._gameMode || this._gameMode === null) {
      console.log('entering Menu mode');
      this._gameMode = false;
      if (this._gameBuilder) {
        this._gameBuilder.cleanUpScene();
      } else {
        this.initGameBuilder();
      }
      this.createMenuBackground();
      this.gameRenderer.enterGameMode();
    }
  }

  enterGameMode() {
    if (!this._gameMode || this._gameMode === null) {
      console.log('entering Game mode');
      this._gameMode = true;
      if (this._gameBuilder) {
        this._gameBuilder.cleanUpScene();
      } else {
        this.initGameBuilder();
      }
      this.destroyMenuBackground();
      this.gameRenderer.enterGameMode();
    }
  }

  isGameMode() {
    return this._gameMode;
  }
}


export const gameMemoryStorage = new BombermanGameMemoryStorage();
