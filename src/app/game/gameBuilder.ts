import { Vector3 } from 'babylonjs';

import { GameRenderer } from '../shared/engine';
import { IBaseModel, Character, Cube, Ground, Sphere } from '../shared/engine/object';

import { BombermanGameMap } from './gameMap';
import { IBombermanPlayer } from './models/bombermanPlayer.interface';
import { IBombermanGameTheme } from './models/bombermanGameTheme.interface';
import { IBombermanGameSize } from './models/bombermanGameSize.interface';


import { EPlayerCharacterType } from './models';


export class GameBuilder {
  private _gameRenderer: GameRenderer;
  private _ground: Ground;
  private _currentCharacter: Character;
  private _borderWall: Cube[] = [];
  private _indestructibleWalls: Cube[] = [];
  private _destructibleWalls: Cube[] = [];
  private _characters: Character[] = [];

  private _gameMap: BombermanGameMap;


  protected _wallHeight = 0.7;
  protected _wallWidth = 1;
  protected _wallDepth = 1;

  protected _rewardMaxPosibilites = 10;
  protected _rewardChance = 6;


  constructor(gameRenderer: GameRenderer) {
    this._gameRenderer = gameRenderer;
    this._gameMap = new BombermanGameMap();
  }

  public findGroundTexture(gameTheme: IBombermanGameTheme): string {
    return gameTheme.groundTextures[
      Math.floor(Math.random() * gameTheme.groundTextures.length)
    ];
  }

  public findDestructibleTexture(gameTheme: IBombermanGameTheme): string {
    return gameTheme.wallTextures.destructibleWalls[
      Math.floor(Math.random() * gameTheme.wallTextures.destructibleWalls.length)
    ];
  }

  public findIndestructibleTexture(gameTheme: IBombermanGameTheme): string {
    return gameTheme.wallTextures.indestructibleWalls[
      Math.floor(Math.random() * gameTheme.wallTextures.indestructibleWalls.length)
    ];
  }

  public findNewReward() {

  }

  public buildBombermanGame(players: IBombermanPlayer[], gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {
    this._gameMap.createMap(size.width, size.height);
    this._ground = new Ground(
      this._gameRenderer,
      new Vector3(((size.width % 2) / 2) + Math.floor(size.width / 2), 0, ((size.height % 2) / 2) + Math.floor(size.height / 2)),
      size.width,
      size.height,
      this.findGroundTexture(gameTheme)
    );
    this.buildBorder(gameTheme, size);
    this.generateIndestructibleWalls(gameTheme, size);
    this.buildPlayers(players, size);
    this._gameMap.fillMapWithDestructive().forEach(position => {
      const cubeTexture = this.findDestructibleTexture(gameTheme);
      const cube = new Cube(
        this._gameRenderer,
        new Vector3(position[0] - 0.5, this._wallHeight / 2, position[1] - 0.5),
        1, 0.7, 1, false
      );
      const randNr = Math.round(Math.random() * this._rewardMaxPosibilites);
      cube.setTextureFromGallery(cubeTexture);
      let reward = null;
      if (randNr === this._rewardChance) {
        reward = this.findNewReward();
      }
      this._gameMap.addDestructibleWall(position[0], position[1], cube, reward);
      this._destructibleWalls.push(cube);
    });
  }

  private buildBorder(gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {
    const borderTexture = this.findIndestructibleTexture(gameTheme);
    let cube = new Cube(
      this._gameRenderer,
      new Vector3(size.width / 2, this._wallHeight / 2, -0.5),
      size.width + 2, this._wallHeight, 1, false
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(size.width / 2, this._wallHeight / 2, size.height + 0.5),
      size.width + 2, this._wallHeight, 1, false
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(-0.5, this._wallHeight / 2, size.height / 2),
      1, this._wallHeight, size.height, false
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(size.width + 0.5, this._wallHeight / 2, size.height / 2),
      1, this._wallHeight, size.height, false
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
  }

  private generateIndestructibleWalls(gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {
    const xDiff = (size.width % 2);
    const yDiff = (size.height % 2);
    for (let i = 1 + xDiff; i <= size.width; i = i + 2) {
      for (let j = 1 + xDiff; j <= size.height; j = j + 2) {
        const borderTexture = this.findIndestructibleTexture(gameTheme);
        const cube = new Cube(
          this._gameRenderer,
          new Vector3(i - 0.5, this._wallHeight / 2, j - 0.5),
          1, this._wallHeight, 1, false
        );
        cube.setTextureFromGallery(borderTexture);
        this._indestructibleWalls.push(cube);
        this._gameMap.addIndestructibleWall(i, j, cube);
      }
    }
  }

  private buildPlayers(players: IBombermanPlayer[], size: IBombermanGameSize) {
    const positions = this._gameMap.computePlayersPositions(players.length);
    let index = 0;
    players.forEach(character => {
      index++;
      const currentPosition = positions[index];
      if (character.playerType === EPlayerCharacterType.current) {
        this._gameMap.addPlayerPosition(currentPosition[0], currentPosition[1]);
        this._currentCharacter = new Character(
          this._gameRenderer,
          new Vector3(currentPosition[0] - 0.5, 0, currentPosition[1] - 0.5),
          {
            forwardKey: 38,
            backwardKey: 40,
            leftKey: 37,
            rightKey: 39,
            alternateEvents: [
              {
                key: 32,
                onlyOnPress: true,
                callback: () => {
                  const position = this._currentCharacter.getPosition();
                  this.dropBomb(position);
                }
              }
            ]
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
        this._gameMap.addPlayerPosition(currentPosition[0], currentPosition[1]);
        const newCharacter = new Character(
          this._gameRenderer,
          new Vector3(currentPosition[0] - 0.5, 0, currentPosition[1] - 0.5)
        );
        newCharacter.buildFromGallery(character.characterModel, () => {
        });
        this._characters.push(newCharacter);
      }
    });
  }

  dropBomb(position) {
    const sphere = new Sphere(this._gameRenderer, new Vector3(position.x, 0.35, position.y), 0.3);
    /*    setInterval(() => {

        }, 5);*/
    setTimeout(() => {
      sphere.destroy();
    }, 3000);
  }
}
