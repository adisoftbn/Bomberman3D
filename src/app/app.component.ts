import { Component, AfterViewInit } from '@angular/core';
import { Vector3 } from 'babylonjs';

import { IGameRenderer, GameRenderer } from './shared/engine';

import { IBaseModel, Character, Cube } from './shared/engine/object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _gameRenderer: GameRenderer
  private _currentCharacter: Character;
  private _borderWall: Cube[] = [];
  ngAfterViewInit() {
    this._gameRenderer = new GameRenderer('renderCanvas');
    const groundWidth = 50;
    const groundHeight = 30;
    this._gameRenderer.setGroundSize(groundWidth, groundHeight);
    this._gameRenderer.createScene();
    this._gameRenderer.animate();
    
    let cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, -groundHeight / 2), groundWidth + 1, 1, 1);
    cube.setTextureFromGallery('wall-bricks');
    this._borderWall.push(cube);
    cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, groundHeight / 2), groundWidth + 1, 1, 1);
    cube.setTextureFromGallery('wall-bricks');
    this._borderWall.push(cube);
    cube = new Cube(this._gameRenderer, new Vector3(groundWidth / 2, 0.5, 0), 1, 1, groundHeight - 1);
    cube.setTextureFromGallery('wall-bricks');
    this._borderWall.push(cube);
    cube = new Cube(this._gameRenderer, new Vector3(-groundWidth / 2, 0.5, 0), 1, 1, groundHeight - 1);
    cube.setTextureFromGallery('wall-bricks');
    this._borderWall.push(cube);

    cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, 0), 1, 1, 1);
    cube.setTextureFromGallery('wall-bricks2');

    cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, 1.2), 1, 1, 1);
    cube.setTextureFromGallery('wall-bricks2');

    this.createTestGame();
  }

  createTestGame() {

    this._gameRenderer.setGroundTextureFromGallery('ground-pavement');
    this._currentCharacter = new Character(this._gameRenderer, new Vector3(0, 0, 0), {
      forwardKey: 38,
      backwardKey: 40,
      leftKey: 37,
      rightKey: 39
    });
    this._currentCharacter.buildFromGallery('rabbit', () => {
      const camera = this._gameRenderer.getCamera();
      camera.parent = this._currentCharacter.getModelRoot();
      camera.position.z = -30;
      camera.rotation.x = Math.PI / 6;
      // camera.lockedTarget = this._currentCharacter.getModel();
      //      camera.setPosition(new BABYLON.Vector3(11.5, 3.5, 0));
      camera.position.y = 30;
    });
  }
}
