import { Component, AfterViewInit } from '@angular/core';

import { texturesUrl, charactersData, themesData } from './config';
import { GameRenderer } from './shared/engine';

import { EPlayerCharacterType, IBombermanGameRules, BombermanGameRules } from './game/model';
import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from './game/model/options';
import { GameBuilder, GameThemes, EGameBuilderEventType } from './game';

import { environment } from '../environments/environment';

import { gameMemoryStorage } from './shared/gameMemoryStorage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _gameBuilder: GameBuilder;
  private _gameThemes: GameThemes;
  private _gameRules: IBombermanGameRules;

  constructor() {
    if (environment.graphicsOptions === 'low') {
      gameMemoryStorage.graphicsOptions = new BombermanLowGraphicsOptions();
    } else if (environment.graphicsOptions === 'medium') {
      gameMemoryStorage.graphicsOptions = new BombermanMediumGraphicsOptions();
    } else if (environment.graphicsOptions === 'high') {
      gameMemoryStorage.graphicsOptions = new BombermanHighGraphicsOptions();
    } else {
      gameMemoryStorage.graphicsOptions = new BombermanVeryLowGraphicsOptions();
    }
  }

  ngAfterViewInit() {
    gameMemoryStorage.gameRenderer = new GameRenderer('renderCanvas', {
      shadowEnabled: gameMemoryStorage.graphicsOptions.worldShadowEnabled,
      shadowQuality: gameMemoryStorage.graphicsOptions.worldShadowQuality
    });
    gameMemoryStorage.gameRenderer.animate();
    gameMemoryStorage.gameRenderer.createScene();

    gameMemoryStorage.gameRenderer.getTextureGallery().initTextureObjects(texturesUrl);
    gameMemoryStorage.gameRenderer.getCharacterGallery().initCharacterObjects(charactersData);



    this._gameBuilder = new GameBuilder(gameMemoryStorage.gameRenderer, gameMemoryStorage.graphicsOptions,
      (eventType: EGameBuilderEventType, data: any) => {
        if (eventType === EGameBuilderEventType.currentPlayerKilled) {
          alert('You died!');
        }
      }
    );
    this._gameThemes = new GameThemes();
    this._gameThemes.initGameThemes(themesData);

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
      this._gameThemes.getThemeByName('theme1'),
      {
        width: 11,
        height: 10
      },
      this._gameRules
    );
    // this._gameRenderer.getScene().debugLayer.show();
  }

}
