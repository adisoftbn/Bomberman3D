import { GameRenderer } from './engine';
import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from './game/model/options';

import { EPlayerCharacterType, IBombermanGameRules, BombermanGameRules } from './game/model';
import { GameBuilder, GameThemes, EGameBuilderEventType } from './game';


class BombermanGameMemoryStorage {
  private _gameBuilder: GameBuilder = null;
  gameThemes: GameThemes = null;
  private _gameRules: IBombermanGameRules = null;

  gameRenderer: GameRenderer = null;
  graphicsOptions: IBombermanGraphicsOptions;

  buildNewGame() {



    this._gameBuilder = new GameBuilder(gameMemoryStorage.gameRenderer, gameMemoryStorage.graphicsOptions,
      (eventType: EGameBuilderEventType, data: any) => {
        if (eventType === EGameBuilderEventType.currentPlayerKilled) {
          alert('You died!');
        }
      }
    );
    this._gameRules = new BombermanGameRules()




    this._gameBuilder.buildBombermanGame(
      [
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.current,
          characterName: 'Unknown',
          characterModel: 'archer'
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
