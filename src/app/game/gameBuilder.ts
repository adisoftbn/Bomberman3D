import { Vector3 } from 'babylonjs';

import { IBombermanPlayer } from './models/bombermanPlayer.interface';
import { IBombermanGameTheme } from './models/bombermanGameTheme.interface';
import { IBombermanGameSize } from './models/bombermanGameSize.interface';
import { GameRenderer } from '../shared/engine';

import { IBaseModel, Character, Cube, Ground } from '../shared/engine/object';

import { EPlayerCharacterType } from './models';


export class GameBuilder {
  private _gameRenderer: GameRenderer;
  private _ground: Ground;
  private _currentCharacter: Character;
  private _borderWall: Cube[] = [];
  private _characters: Character[] = [];


  constructor(gameRenderer: GameRenderer) {
    this._gameRenderer = gameRenderer;
  }

  findGroundTexture(gameTheme: IBombermanGameTheme): string {
    return gameTheme.groundTextures[
      Math.floor(Math.random() * gameTheme.groundTextures.length)
    ];
  }

  findDestructibleTexture(gameTheme: IBombermanGameTheme): string {
    return gameTheme.wallTextures.destructibleWalls[
      Math.floor(Math.random() * gameTheme.wallTextures.destructibleWalls.length)
    ];
  }

  findIndestructibleTexture(gameTheme: IBombermanGameTheme): string {
    return gameTheme.wallTextures.indestructibleWalls[
      Math.floor(Math.random() * gameTheme.wallTextures.indestructibleWalls.length)
    ];
  }

  buildBombermanGame(players: IBombermanPlayer[], gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {
    this._ground = new Ground(this._gameRenderer, size.width, size.height, this.findGroundTexture(gameTheme));

    const borderTexture = this.findIndestructibleTexture(gameTheme);
    console.log(borderTexture);
    let cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, -size.height / 2), size.width + 1, 1, 1);
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, size.height / 2), size.width + 1, 1, 1);
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(this._gameRenderer, new Vector3(size.width / 2, 0.5, 0), 1, 1, size.height - 1);
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(this._gameRenderer, new Vector3(-size.width / 2, 0.5, 0), 1, 1, size.height - 1);
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);

    cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, 0), 1, 1, 1);
    cube.setTextureFromGallery(this.findDestructibleTexture(gameTheme));

    cube = new Cube(this._gameRenderer, new Vector3(0, 0.5, 1), 1, 1, 1);
    cube.setTextureFromGallery(this.findDestructibleTexture(gameTheme));

    players.forEach(character => {
      console.log(character);
      if (character.playerType === EPlayerCharacterType.Current) {
        this._currentCharacter = new Character(
          this._gameRenderer,
          new Vector3(character.initialPosition.x, 0, character.initialPosition.y),
          {
            forwardKey: 38,
            backwardKey: 40,
            leftKey: 37,
            rightKey: 39
          }
        );
        this._currentCharacter.buildFromGallery(character.characterModel, () => {
          const camera = this._gameRenderer.getCamera();
          camera.parent = this._currentCharacter.getModelRoot();
          camera.position.z = -30;
          camera.rotation.x = Math.PI / 6;
          camera.position.y = 30;
        });
      } else {
        const newCharacter = new Character(
          this._gameRenderer,
          new Vector3(character.initialPosition.x, 0, character.initialPosition.y)
        );
        newCharacter.buildFromGallery(character.characterModel, () => {
        });
        this._characters.push(newCharacter);
      }
    });


  }
}
