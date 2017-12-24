import { Component, AfterViewInit } from '@angular/core';

import { IGameRenderer, GameRenderer } from './shared/engine';

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
    this._gameRenderer = new GameRenderer('renderCanvas');
    this._gameBuilder = new GameBuilder(this._gameRenderer);
    this._gameThemes = new GameThemes();
    this._gameRenderer.animate();
    this._gameRenderer.createScene();
    this._gameBuilder.buildBombermanGame(
      [
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.Current,
          characterName: 'Unknown',
          initialPosition: {
            x: 1,
            y: 2
          },
          characterModel: 'rabbit'
        },
        {
          name: 'Unknown player',
          playerType: EPlayerCharacterType.ComputerEasy,
          characterName: 'Unknown',
          initialPosition: {
            x: 1,
            y: 3
          },
          characterModel: 'dude'
        }
      ],
      this._gameThemes.getThemeByName('theme1'),
      {
        width: 10,
        height: 10
      }
    );
  }

}
