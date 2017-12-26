import { Vector3 } from 'babylonjs';

import { GameRenderer, IRendererGraphicOptions, RendererGraphicOptions, ERendererShadowQuality } from '../shared/engine';
import { IBaseModel, Character, Cube, Ground, Sphere } from '../shared/engine/object';

import { BombermanGameMap } from './gameMap';

import { EPlayerCharacterType, BombermanPlayerStats, IBombermanPlayerModel, IBombermanGameTheme, IBombermanGameSize } from './model';
import { IBombermanGraphicsOptions } from './model/options';
import { BombermanPlayer } from './object';


export class GameBuilder {
  private _gameRenderer: GameRenderer;
  private _gameGraphicsOptions: IBombermanGraphicsOptions
  private _ground: Ground;
  private _borderWall: Cube[] = [];
  private _indestructibleWalls: Cube[] = [];
  private _destructibleWalls: Cube[] = [];


  private _curretPlayerStats: BombermanPlayerStats;
  private _currentPlayer: BombermanPlayer;
  private _players: BombermanPlayer[] = [];

  private _gameMap: BombermanGameMap;


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

  public buildBombermanGame(players: IBombermanPlayerModel[], gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {
    this._gameMap.createMap(size.width, size.height);
    this._ground = new Ground(
      this._gameRenderer,
      new Vector3(((size.width % 2) / 2) + Math.floor(size.width / 2), 0, ((size.height % 2) / 2) + Math.floor(size.height / 2)),
      size.width,
      size.height,
      this.findGroundTexture(gameTheme), {
        shadowsEnabled: this._gameGraphicsOptions.worldShadowEnabled,
        shadowQuality: this._gameGraphicsOptions.worldShadowQuality
      }
    );
    this.buildBorder(gameTheme, size);
    this.generateIndestructibleWalls(gameTheme);
    this.buildPlayers(gameTheme, players);
    this.generateDestructibleWalls(gameTheme);
  }

  private buildBorder(gameTheme: IBombermanGameTheme, size: IBombermanGameSize) {
    const borderTexture = this.findIndestructibleTexture(gameTheme);
    const borderGraphicsOptions = {
      shadowsEnabled: this._gameGraphicsOptions.borderWallShadowEnabled,
      shadowQuality: this._gameGraphicsOptions.borderWallShadowQuality
    };
    let cube = new Cube(
      this._gameRenderer,
      new Vector3(size.width / 2, this._wallHeight / 2, -0.5),
      size.width + 2, this._wallHeight, 1, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(size.width / 2, this._wallHeight / 2, size.height + 0.5),
      size.width + 2, this._wallHeight, 1, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(-0.5, this._wallHeight / 2, size.height / 2),
      1, this._wallHeight, size.height, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(size.width + 0.5, this._wallHeight / 2, size.height / 2),
      1, this._wallHeight, size.height, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
  }

  private generateIndestructibleWalls(gameTheme: IBombermanGameTheme) {
    gameTheme.indestructibleWallPlacementAlgorithm(this._gameMap).forEach(position => {
      const borderTexture = this.findIndestructibleTexture(gameTheme);
      const cube = new Cube(
        this._gameRenderer,
        new Vector3(position[0] - 0.5, this._wallHeight / 2, position[1] - 0.5),
        1, this._wallHeight, 1, false, {
          shadowsEnabled: false,
        }
      );
      cube.setTextureFromGallery(borderTexture);
      this._indestructibleWalls.push(cube);
      this._gameMap.addIndestructibleWall(position[0], position[1], cube);
    });
  }

  private generateDestructibleWalls(gameTheme: IBombermanGameTheme) {
    gameTheme.destructibleWallPlacementAlgorithm(this._gameMap).forEach(position => {
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

  private buildPlayers(gameTheme: IBombermanGameTheme, players: IBombermanPlayerModel[]) {
    const positions = gameTheme.playerPlacementAlgorithm(this._gameMap, players.length);
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

  getGameGraphicsOptions(): IBombermanGraphicsOptions {
    return this._gameGraphicsOptions;
  }

  getGameRenderer(): GameRenderer {
    return this._gameRenderer;
  }
}
