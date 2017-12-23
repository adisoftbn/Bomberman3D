import { Component, AfterViewInit } from '@angular/core';
import { Vector3 } from 'babylonjs';

import { IGameRenderer, GameRenderer } from './shared/engine';

import { IBaseModel, Character } from './shared/engine/object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _gameRenderer: GameRenderer
  private _currentCharacter: Character;
  ngAfterViewInit() {
    this._gameRenderer = new GameRenderer('renderCanvas');
    this._gameRenderer.setGroundSize(500, 300);
    this._gameRenderer.createScene();
    this._gameRenderer.animate();
    this.createTestGame();
  }

  createTestGame() {
    this._gameRenderer.setGroundTextureFromGallery('pavement');
    this._currentCharacter = new Character(this._gameRenderer, new Vector3(0, 0, 0), {
      forwardKey: 38,
      backwardKey: 40,
      leftKey: 37,
      rightKey: 39
    });
    this._currentCharacter.buildFromGallery('rabbit', () => {
      const camera = this._gameRenderer.getCamera();
      camera.parent = this._currentCharacter.getModel();
      // camera.lockedTarget = this._currentCharacter.getModelHead();
      //      camera.setPosition(new BABYLON.Vector3(11.5, 3.5, 0));
      camera.position.y = 30;
    });
  }
}
