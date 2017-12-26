import { Component, AfterViewInit } from '@angular/core';

import { texturesUrl, charactersData, themesData } from './config';
import { GameRenderer, ERendererShadowQuality } from './shared/engine';

import { EPlayerCharacterType } from './game/model';
import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from '../app/game/model/options';
import { GameBuilder, GameThemes } from './game';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _gameRenderer: GameRenderer;
  private _gameBuilder: GameBuilder;
  private _gameThemes: GameThemes;

  private _graphicsOptions: IBombermanGraphicsOptions;

  constructor() {
    if (environment.graphicsOptions === 'low') {
      this._graphicsOptions = new BombermanLowGraphicsOptions();
    } else if (environment.graphicsOptions === 'medium') {
      this._graphicsOptions = new BombermanMediumGraphicsOptions();
    } else if (environment.graphicsOptions === 'medium') {
      this._graphicsOptions = new BombermanHighGraphicsOptions();
    } else {
      this._graphicsOptions = new BombermanVeryLowGraphicsOptions();
    }
  }

  ngAfterViewInit() {
    this._gameRenderer = new GameRenderer('renderCanvas', {
      shadowsEnabled: this._graphicsOptions.worldShadowEnabled,
      shadowQuality: this._graphicsOptions.worldShadowQuality
    });
    this._gameRenderer.getTextureGallery().initTextureObjects(texturesUrl);
    this._gameRenderer.getCharacterGallery().initCharacterObjects(charactersData);
    this._gameBuilder = new GameBuilder(this._gameRenderer, this._graphicsOptions);
    this._gameThemes = new GameThemes();
    this._gameThemes.initGameThemes(themesData);
    this._gameRenderer.animate();
    this._gameRenderer.createScene();
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
          characterModel: 'dude'
        }
      ],
      this._gameThemes.getThemeByName('theme1'),
      {
        width: 11,
        height: 10
      }
    );
    // this._gameRenderer.getScene().debugLayer.show();
  }

}
