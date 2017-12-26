import { Component, AfterViewInit } from '@angular/core';

import { texturesUrl, charactersData } from './config';
import { GameRenderer, ERendererShadowsQuality } from './shared/engine';

import { EPlayerCharacterType } from './game/models';

import { GameBuilder, GameThemes } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _gameRenderer: GameRenderer;
  private _gameBuilder: GameBuilder;
  private _gameThemes: GameThemes;

  ngAfterViewInit() {
    this._gameRenderer = new GameRenderer('renderCanvas', {
      shadowsEnabled: true,
      shadowsQuality: ERendererShadowsQuality.high
    });
    this._gameRenderer.getTextureGallery().initTextureObjects(texturesUrl);
    this._gameRenderer.getCharacterGallery().initCharacterObjects(charactersData);
    this._gameBuilder = new GameBuilder(this._gameRenderer);
    this._gameThemes = new GameThemes();
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
