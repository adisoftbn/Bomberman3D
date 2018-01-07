import { Vector3 } from 'babylonjs';

import { GameRenderer } from '../engine';
import { BaseModel, Cube, Ground } from '../engine/object';
import { JoystickEvent } from '../engine/model';


import { BombermanGameMap } from './gameMap';
import { BombermanGameRewards } from './gameRewards';

import {
  EPlayerCharacterType, BombermanPlayerStats, IBombermanPlayerModel, BombermanGameTheme, IBombermanGameSize,
  EBombermanWallType, IBombermanGameRules, BombermanGameRules, IBombermanGameReward
} from './model';

import { IBombermanGraphicsOptions } from './model/options';
import { BombermanPlayer, DestructibleWall, IndestructibleWall, BombermanReward, BombermanPlayerBomb } from './object';

export enum EGameBuilderEventType {
  currentPlayerKilled = 1,
  playerKilled = 2,
  reward = 3,
  gameStart = 4,
  gameEnd = 5,
  gameRewardFound = 6
}

export type TGameBuilderCallback = (eventType: EGameBuilderEventType, data?: any) => void;


export class GameBuilder {
  private _gameRenderer: GameRenderer;
  private _gameGraphicsOptions: IBombermanGraphicsOptions
  private _ground: Ground;
  private _borderWall: Cube[] = [];
  private _indestructibleWalls: IndestructibleWall[] = [];
  private _destructibleWalls: DestructibleWall[] = [];


  private _currentPlayerStats: BombermanPlayerStats;
  private _currentPlayer: BombermanPlayer;
  private _players: BombermanPlayer[] = [];

  private _gameMap: BombermanGameMap;
  private _gameTheme: BombermanGameTheme;
  private _gameRewards: BombermanGameRewards;
  private _gameRules: IBombermanGameRules;


  protected _wallHeight = 0.7;
  protected _wallWidth = 1;
  protected _wallDepth = 1;

  protected _rewardMaxPosibilites = 10;
  protected _rewardChance = 6;

  protected _gameBuilderEventCallback: TGameBuilderCallback = null;


  constructor(gameRenderer: GameRenderer, gameRewards: BombermanGameRewards, gameGraphicsOptions: IBombermanGraphicsOptions,
    gameBuilderEventCallback: TGameBuilderCallback = null) {
    this._gameRenderer = gameRenderer;
    this._gameRewards = gameRewards;
    this._gameGraphicsOptions = gameGraphicsOptions;
    this._gameBuilderEventCallback = gameBuilderEventCallback;
    this._gameMap = new BombermanGameMap();
  }

  public joystickEventCallback(event: JoystickEvent) {
    if (this._currentPlayer) {
      this._currentPlayer.getCharacter().joystickEventListener(event);
    }
  }

  public keyPressCallback(event) {
    if (this._currentPlayer) {
      this._currentPlayer.getCharacter().keyPressListener(event);
    }
  }

  public keyUpCallback(event) {
    if (this._currentPlayer) {
      this._currentPlayer.getCharacter().keyUpListener(event);
    }
  }

  public keyDownCallback(event) {
    if (this._currentPlayer) {
      this._currentPlayer.getCharacter().keyDownListener(event);
    }
  }

  protected proceedGameBuilderCallback(eventType: EGameBuilderEventType, data: any = null) {
    if (this._gameBuilderEventCallback) {
      this._gameBuilderEventCallback(eventType, data);
    }
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

  public setGameTheme(gameTheme: BombermanGameTheme) {
    this._gameTheme = gameTheme;
  }

  public cleanUpScene() {
    console.log('cleanup scene');
    if (this._ground) {
      this._ground.destroy();
      this._ground = null;
    }
    this._borderWall.forEach(cube => {
      cube.destroy();
    });
    this._borderWall = [];

    this._indestructibleWalls.forEach(cube => {
      cube.destroy();
    });
    this._indestructibleWalls = [];

    this._destructibleWalls.forEach(cube => {
      cube.destroy();
    });
    this._destructibleWalls = [];

    this._players.forEach(player => {
      player.destroy();
    });
    this._players = [];
    if (this._currentPlayer) {
      this._gameRenderer.getCamera().parent = null;
      this._gameRenderer.getCamera().position.set(0, 0, 0);
      this._gameRenderer.getCamera().rotation.set(0, 0, 0); // = BABYLON.Vector3.Zero()
      this._currentPlayer.destroy();
      this._currentPlayer = null;
      this._currentPlayerStats = null;
    }
    this._gameRenderer.getShadowGenerator().getShadowMap().renderList = [];
  }

  public buildBombermanGame(players: IBombermanPlayerModel[], gameTheme: BombermanGameTheme, size: IBombermanGameSize,
    gameRules: IBombermanGameRules
  ) {
    this._gameTheme = gameTheme;
    this._gameRules = gameRules;
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
    this.proceedGameBuilderCallback(EGameBuilderEventType.gameStart);
  }

  private buildBorder() {
    const borderWidth = 0.3;
    const borderTexture = this.findIndestructibleTexture();
    const borderGraphicsOptions = {
      shadowEnabled: this._gameGraphicsOptions.borderWallShadowEnabled,
      shadowQuality: this._gameGraphicsOptions.borderWallShadowQuality
    };
    let cube = new Cube(
      this._gameRenderer,
      new Vector3(this._gameMap.getWidth() / 2, this._wallHeight / 2, -borderWidth / 2),
      this._gameMap.getWidth() + borderWidth * 2, this._wallHeight, borderWidth, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(this._gameMap.getWidth() / 2, this._wallHeight / 2, this._gameMap.getHeight() + borderWidth / 2),
      this._gameMap.getWidth() + borderWidth * 2, this._wallHeight, borderWidth, false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(-borderWidth / 2, this._wallHeight / 2, this._gameMap.getHeight() / 2),
      borderWidth, this._wallHeight, this._gameMap.getHeight(), false, borderGraphicsOptions
    );
    cube.setTextureFromGallery(borderTexture);
    this._borderWall.push(cube);
    cube = new Cube(
      this._gameRenderer,
      new Vector3(this._gameMap.getWidth() + borderWidth / 2, this._wallHeight / 2, this._gameMap.getHeight() / 2),
      borderWidth, this._wallHeight, this._gameMap.getHeight(), false, borderGraphicsOptions
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
      let reward = true;
      if (randNr === this._rewardChance) {
        reward = true;
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
      const currentPosition = this._gameMap.findBetterPlayerPosition(positions[index - 1]);
      if (character.playerType === EPlayerCharacterType.current) {
        this._currentPlayerStats = new BombermanPlayerStats();
        this._gameMap.addPlayerPosition(currentPosition[0], currentPosition[1]);
        this._currentPlayer = new BombermanPlayer(this, character, this._currentPlayerStats, currentPosition, true)
      } else {
        const newPlayer = new BombermanPlayer(this, character, new BombermanPlayerStats(), currentPosition, false)
        this._gameMap.addPlayerPosition(currentPosition[0], currentPosition[1]);
        this._players.push(newPlayer);
      }
    });
  }

  public flareDestroyPlayers(x: number, y: number, directions, computedCells = null) {
    const cells = (computedCells ? computedCells : this._gameMap.getFlareAffectedCells(x, y, directions));
    if (!this._currentPlayer.getCharacter().isCharacterKilled()) {
      const rawPosition = this._currentPlayer.getCharacter().getPosition();
      const newPosition = this._gameMap.fixPosition(rawPosition.x, rawPosition.z);
      if (cells.emptyByHash['cell_' + newPosition.cellX + '_' + newPosition.cellY]) {
        if (!this._currentPlayer.getCharacter().isCharacterKilled()) {
          this.proceedGameBuilderCallback(EGameBuilderEventType.currentPlayerKilled);
          this._currentPlayer.getCharacter().killCharacter(() => {
            // TODO: Event when current player killed
          });
        }
      }
    }
    this._players.forEach(player => {
      if (!player.getCharacter().isCharacterKilled()) {
        const rawPosition = player.getCharacter().getPosition();
        const newPosition = this._gameMap.fixPosition(rawPosition.x, rawPosition.z);
        if (cells.emptyByHash['cell_' + newPosition.cellX + '_' + newPosition.cellY]) {
          if (!player.getCharacter().isCharacterKilled()) {
            this.proceedGameBuilderCallback(EGameBuilderEventType.playerKilled);
            player.getCharacter().killCharacter(() => {
              // TODO: Event when player killed
            });
          }
        }
      }
    });
    return cells;
  }
  public addNewReward(x: number, y: number, gameReward: IBombermanGameReward) {
    const cube = new BombermanReward(
      this,
      new Vector3(x - 0.5, 0.15, y - 0.5),
      gameReward
    );
  }

  public flareDestroy(x: number, y: number, directions, computedCells = null) {
    const cells = this.flareDestroyPlayers(x, y, directions, computedCells);
    cells.walls.forEach(cell => {
      if (cell.contents.type === 'destructible-wall') {
        if (this._gameMap.removeDestructibleWall(cell.x, cell.y)) {
          const index = this._destructibleWalls.indexOf(cell.contents.object);
          if (index > -1) {
            this._destructibleWalls.splice(index, 1);
            (cell.contents.object as DestructibleWall).killWall(() => {
              cell.contents.object.destroy();
            });
          }
          if (cell.contents.reward) {
            this.addNewReward(cell.x, cell.y, this._gameRewards.getRandomReward());
          } else {
            // TODO: random increase rewards
          }
        } else {
          // TODO: maybe a bug hapens sometimes. But it doesn't!
        }
      } else if (cell.contents.type === 'bomb') {
        if (this._gameRules.bombCascadeDestroy) {
          (cell.contents.object as BombermanPlayerBomb).forceKill();
        }
        // } else if (cell.contents.type === 'indestructible-wall') {
        /* if (this._gameRules.bombCascadeDestroy) {
          (cell.contents.object as BombermanPlayerBomb).forceKill();
        }*/
      }
    });
    return cells;
  }

  public getGameGraphicsOptions(): IBombermanGraphicsOptions {
    return this._gameGraphicsOptions;
  }

  public getGameRenderer(): GameRenderer {
    return this._gameRenderer;
  }

  public getGameTheme(): BombermanGameTheme {
    return this._gameTheme;
  }

  public getGameMap(): BombermanGameMap {
    return this._gameMap;
  }

  public getCurrentPlayer() {
    return this._currentPlayer;
  }

  public getCurrentPlayerStats() {
    return this._currentPlayerStats;
  }

}
