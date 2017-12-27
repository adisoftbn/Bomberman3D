import { Vector3 } from 'babylonjs';

import { GameRenderer } from '../shared/engine';
import { BaseModel, Cube, Ground } from '../shared/engine/object';

import { BombermanGameMap } from './gameMap';

import {
  EPlayerCharacterType, BombermanPlayerStats, IBombermanPlayerModel, BombermanGameTheme, IBombermanGameSize,
  EBombermanWallType
} from './model';
import { IBombermanGraphicsOptions } from './model/options';
import { BombermanPlayer, DestructibleWall, IndestructibleWall } from './object';


export class GameBuilder {
  private _gameRenderer: GameRenderer;
  private _gameGraphicsOptions: IBombermanGraphicsOptions
  private _ground: Ground;
  private _borderWall: Cube[] = [];
  private _indestructibleWalls: IndestructibleWall[] = [];
  private _destructibleWalls: DestructibleWall[] = [];


  private _curretPlayerStats: BombermanPlayerStats;
  private _currentPlayer: BombermanPlayer;
  private _players: BombermanPlayer[] = [];

  private _gameMap: BombermanGameMap;
  private _gameTheme: BombermanGameTheme;


  protected _wallHeight = 0.7;
  protected _wallWidth = 1;
  protected _wallDepth = 1;

  protected _rewardMaxPosibilites = 10;
  protected _rewardChance = 6;


  constructor(gameRenderer: GameRenderer, gameGraphicsOptions: IBombermanGraphicsOptions) {
    this._gameRenderer = gameRenderer;
    this._gameGraphicsOptions = gameGraphicsOptions;
    this._gameMap = new BombermanGameMap();
  }

  public findGroundTexture(): string {
    return this._gameTheme.groundTextures[
      Math.floor(Math.random() * this._gameTheme.groundTextures.length)
    ];
  }

  public findDestructibleTexture(): string {
    return this._gameTheme.wallTextures.destructibleWalls[
      Math.floor(Math.random() * this._gameTheme.wallTextures.destructibleWalls.length)
    ];
  }
  public findDestructibleWallType(): EBombermanWallType {
    const wallType = this._gameTheme.wallTypes.destructibleWalls[
      Math.floor(Math.random() * this._gameTheme.wallTypes.destructibleWalls.length)
    ];
    if (wallType === 'cube') {
      return EBombermanWallType.cube;
    } else if (wallType === 'small-cube') {
      return EBombermanWallType.smallCube;
    } else if (wallType === 'cylinder') {
      return EBombermanWallType.cylinder;
    } else if (wallType === 'sphere') {
      return EBombermanWallType.sphere;
    }
    return EBombermanWallType.cube;
  }

  public findIndestructibleTexture(): string {
    return this._gameTheme.wallTextures.indestructibleWalls[
      Math.floor(Math.random() * this._gameTheme.wallTextures.indestructibleWalls.length)
    ];
  }

  public findIndestructibleWallType(): EBombermanWallType {
    const wallType = this._gameTheme.wallTypes.indestructibleWalls[
      Math.floor(Math.random() * this._gameTheme.wallTypes.indestructibleWalls.length)
    ];
    if (wallType === 'cube') {
      return EBombermanWallType.cube;
    } else if (wallType === 'small-cube') {
      return EBombermanWallType.smallCube;
    } else if (wallType === 'cylinder') {
      return EBombermanWallType.cylinder;
    } else if (wallType === 'sphere') {
      return EBombermanWallType.sphere;
    }
    return EBombermanWallType.cube;
  }

  public findNewReward() {

  }

  public buildBombermanGame(players: IBombermanPlayerModel[], gameTheme: BombermanGameTheme, size: IBombermanGameSize) {
    this._gameTheme = gameTheme;
    this._gameMap.createMap(size.width, size.height);
    this._ground = new Ground(
      this._gameRenderer,
      new Vector3(
        ((this._gameMap.getWidth() % 2) / 2) + Math.floor(this._gameMap.getWidth() / 2),
        0,
        ((this._gameMap.getHeight() % 2) / 2) + Math.floor(this._gameMap.getHeight() / 2)
      ),
      this._gameMap.getWidth(),
      this._gameMap.getHeight(),
      this.findGroundTexture(), {
        shadowEnabled: this._gameGraphicsOptions.worldShadowEnabled,
        shadowQuality: this._gameGraphicsOptions.worldShadowQuality
      }
    );
    this.buildBorder();
    this.generateIndestructibleWalls();
    this.buildPlayers(players);
    this.generateDestructibleWalls();
    this._gameMap.makeMapReady();
  }

  private buildBorder() {
    const borderTexture = this.findIndestructibleTexture();
    const borderGraphicsOptions = {
      shadowEnabled: this._gameGraphicsOptions.borderWallShadowEnabled,
      shadowQuality: this._gameGraphicsOptions.borderWallShadowQuality
    };
    let cube = new Cube(
      this._gameRenderer,
      new Vector3(this._gameMap.getWidth() / 2, this._wallHeight / 2, -0.5),
      this._gameMap.getWidth() + 2, this._wallHeight, 1, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(this._gameMap.getWidth() / 2, this._wallHeight / 2, this._gameMap.getHeight() + 0.5),
      this._gameMap.getWidth() + 2, this._wallHeight, 1, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(-0.5, this._wallHeight / 2, this._gameMap.getHeight() / 2),
      1, this._wallHeight, this._gameMap.getHeight(), false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(this._gameMap.getWidth() + 0.5, this._wallHeight / 2, this._gameMap.getHeight() / 2),
      1, this._wallHeight, this._gameMap.getHeight(), false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
  }

  private generateIndestructibleWalls() {
    const cubeTexture = this.findIndestructibleTexture();
    const wallType = this.findIndestructibleWallType()
    this._gameTheme.indestructibleWallPlacementAlgorithm(this._gameMap).forEach(position => {
      const cube = new IndestructibleWall(
        this,
        new Vector3(position[0] - 0.5, this._wallHeight / 2, position[1] - 0.5),
        wallType
      );
      cube.setTextureFromGallery(cubeTexture);
      this._indestructibleWalls.push(cube);
      this._gameMap.addIndestructibleWall(position[0], position[1], cube);
    });
  }

  private generateDestructibleWalls() {
    const cubeTexture = this.findDestructibleTexture();
    const wallType = this.findDestructibleWallType()
    this._gameTheme.destructibleWallPlacementAlgorithm(this._gameMap).forEach(position => {
      const cube = new DestructibleWall(
        this,
        new Vector3(position[0] - 0.5, this._wallHeight / 2, position[1] - 0.5),
        wallType
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

  private buildPlayers(players: IBombermanPlayerModel[]) {
    const positions = this._gameTheme.playerPlacementAlgorithm(this._gameMap, players.length);
    let index = 0;
    players.forEach(character => {
      index++;
      const currentPosition = positions[index];
      if (character.playerType === EPlayerCharacterType.current) {
        this._gameMap.addPlayerPosition(currentPosition[0], currentPosition[1]);
        this._currentPlayer = new BombermanPlayer(this, character, currentPosition, true)
      } else {
        const newPlayer = new BombermanPlayer(this, character, currentPosition, false)
        this._gameMap.addPlayerPosition(currentPosition[0], currentPosition[1]);
        this._players.push(newPlayer);
      }
    });
  }

  flareDestroy(x: number, y: number, directions) {
    const cells = this._gameMap.getFlareAffectedCells(x, y, directions);
    cells.forEach(cell => {
      if (cell.contents.type === 'destructible-wall') {
        if (this._gameMap.removeDestructibleWall(cell.x, cell.y)) {
          const index = this._destructibleWalls.indexOf(cell.contents.object);
          if (index > -1) {
            this._destructibleWalls.splice(index, 1);
            (cell.contents.object as DestructibleWall).killWall(() => {
              cell.contents.object.destroy();
            });
          }
        } else {
          // TODO: maybe a bug hapens sometimes. But it doesn't!
        }
      }
    })
    console.log(cells);
  }

  getGameGraphicsOptions(): IBombermanGraphicsOptions {
    return this._gameGraphicsOptions;
  }

  getGameRenderer(): GameRenderer {
    return this._gameRenderer;
  }

  getGameTheme(): BombermanGameTheme {
    return this._gameTheme;
  }

  getGameMap(): BombermanGameMap {
    return this._gameMap;
  }
}
