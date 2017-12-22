import { Component, AfterViewInit } from '@angular/core';
import { IGameRenderer, GameRenderer } from './shared/engine';

import { IBaseModel, Character } from './shared/engine/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _game: IGameRenderer
  private _currentCharacter: IBaseModel;
  ngAfterViewInit() {
    this._game = new GameRenderer('renderCanvas');
    this._game.createScene();

    this._game.animate();
    this.createTestGame();
  }

  createTestGame() {
    this._currentCharacter = new Character(this._game, 'currentCharacter', '/assets/Rabbit/', 'Rabbit.babylon');
  }
}
