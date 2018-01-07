import { Vector3 } from 'babylonjs';


import { GameRenderer } from './engine';
import { JoystickEvent } from './engine/model';

import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from './game/model/options';

import { GameBuilder, GameThemes, BombermanGameRewards, EGameBuilderEventType } from './game';

import { EPlayerCharacterType, IBombermanGameRules, BombermanGameRules, BombermanPlayerStats } from './game/model';
import { BombermanPlayerBomb, BombermanPlayer } from './game/object';
import { JoystickControl } from './engine/ui/joystickControl';

import { texturesUrl, charactersData, themesData, rewardsData } from '../config';


class BombermanGameMemoryStorage {
  private _gameBuilder: GameBuilder = null;
  private _gameThemes: GameThemes = null;
  private _gameRewards: BombermanGameRewards = null;
  private _gameRules: IBombermanGameRules = null;

  private _gameRenderer: GameRenderer = null;
  private _graphicsOptions: IBombermanGraphicsOptions;


  private _menuBomb: BombermanPlayerBomb = null;
  private _gameMode = null;
  public isGameMode = false;

  private _joystick = null;
  private _joystickControl: JoystickControl = null;

  public currentPlayer: BombermanPlayer = null;
  public currentPlayerStats: BombermanPlayerStats = null;

  public forceMobileControl = false;

  constructor() {
    this._joystickControl = new JoystickControl((event: JoystickEvent) => {
      this.joystickEventCallback(event);
    });
  }

  public initGraphicsOptions(graphicsOptions: IBombermanGraphicsOptions) {
    this._graphicsOptions = graphicsOptions;
  }

  public initGamerRenderer(canvasId) {
    gameMemoryStorage._gameRenderer = new GameRenderer(canvasId, {
      shadowEnabled: this._graphicsOptions.worldShadowEnabled,
      shadowQuality: this._graphicsOptions.worldShadowQuality
    });
    this._gameRenderer.createScene();
    this._gameRenderer.getTextureGallery().initTextureObjects(texturesUrl);
    this._gameRenderer.getCharacterGallery().initCharacterObjects(charactersData);
    this._gameThemes = new GameThemes();
    this._gameThemes.initGameThemes(themesData);
    this._gameRewards = new BombermanGameRewards();
    this._gameRewards.initGameRewards(rewardsData);
  }

  public initGameBuilder() {
    if (!this._gameBuilder) {
      this._gameBuilder = new GameBuilder(this._gameRenderer, this._gameRewards, this._graphicsOptions,
        (eventType: EGameBuilderEventType, data: any) => {
          if (eventType === EGameBuilderEventType.currentPlayerKilled) {

          } else if (eventType === EGameBuilderEventType.gameStart) {
            this.currentPlayer = this._gameBuilder.getCurrentPlayer();
          }
        }
      );
    }
    this._gameBuilder.setGameTheme(this._gameThemes.getThemeByName('theme1'));
  }

  private hasJoystick() {
    return this._joystick !== null;
  }

  private enableJoystick() {
    if (!this._joystick) {
      this._joystick = (nipplejs as any).create({
        zone: document.getElementById('zone_joystick'),
        mode: 'static',
        size: '70',
        // multitouch: true,
        // maxNumberOfNipples: 1,
        color: '#30C5FF',
        // catchDistance: 80,
        position: {
          right: '35px',
          bottom: '35px'
        }
      });
      this._joystick.on('start end', (evt, data) => {
        if (evt.type === 'end') {
          this._joystickControl.clearEvents();
        }
      }).on('move', (evt, data) => {
        this._joystickControl.handleNippleJSEvent(data);
      });
    }
  }

  private disableJoystick() {
    if (this._joystick) {
      this._joystick.destroy();
      this._joystick = null;
    }
  }

  public joystickEventCallback(event: JoystickEvent) {
    if (this._gameBuilder) {
      this._gameBuilder.joystickEventCallback(event);
    }
  }

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

  public createMenuBackground() {
    if (this.forceMobileControl) {
      this.disableJoystick();
    }
    if (!this._menuBomb) {
      this._menuBomb = new BombermanPlayerBomb(this._gameBuilder, null, new Vector3(0, 0.15, 0));
      this._gameRenderer.getCamera().position.set(0, 0, -11);
      this._menuBomb.getModel().scaling.set(5, 5, 5);
    }
  }

  public destroyMenuBackground() {
    if (this.forceMobileControl) {
      this.enableJoystick();
    }
    if (this._menuBomb) {
      this._menuBomb.destroy();
      this._menuBomb = null;
    }
  }

  public buildDemoGame() {
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
      this._gameThemes.getThemeByName('theme1'),
      {
        width: 11,
        height: 10
      },
      this._gameRules
    );
    // this._gameRenderer.getScene().debugLayer.show();
  }

  public buildNewGame(mapSize, players = [], themeName) {
    this.destroyMenuBackground();
    const newWidth = 5 + mapSize * Math.round(Math.random() * 3);
    const newHeight = 5 + mapSize * Math.round(Math.random() * 3);
    this._gameRules = new BombermanGameRules()
    this._gameBuilder.buildBombermanGame(
      players,
      this._gameThemes.getThemeByName(themeName),
      {
        width: newWidth,
        height: newHeight
      },
      this._gameRules
    );
    // this._gameRenderer.getScene().debugLayer.show();
  }

  public enterMenuMode() {
    if (this._gameMode || this._gameMode === null) {
      console.log('entering Menu mode');
      this._gameMode = false;
      setTimeout(() => {
        this.isGameMode = false;
      });
      if (this._gameBuilder) {
        this._gameBuilder.cleanUpScene();
      } else {
        this.initGameBuilder();
      }
      this.createMenuBackground();
      this._gameRenderer.enterGameMode();
    }
  }

  public enterGameMode() {
    if (!this._gameMode || this._gameMode === null) {
      console.log('entering Game mode');
      this._gameMode = true;
      setTimeout(() => {
        this.isGameMode = true;
      });
      if (this._gameBuilder) {
        this._gameBuilder.cleanUpScene();
      } else {
        this.initGameBuilder();
      }
      this.destroyMenuBackground();
      this._gameRenderer.enterGameMode();
    }
  }
}


export const gameMemoryStorage = new BombermanGameMemoryStorage();
