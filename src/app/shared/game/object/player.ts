import { Vector3 } from 'babylonjs';

import { IBombermanPlayer } from './player.interface';
import { BombermanPlayerBomb } from './playerBomb';
import { GameBuilder } from '../';

import { Character, TCharacterCallback } from '../../engine/object';
import { BombermanPlayerStats, EPlayerCharacterType, IBombermanPlayerModel } from '../model';

export class BombermanPlayer implements IBombermanPlayer {
  private _gameBuilder: GameBuilder;
  _character: Character;
  public stats: BombermanPlayerStats;

  constructor(gameBuilder: GameBuilder, character: IBombermanPlayerModel, stats: BombermanPlayerStats, initialPosition: number[],
    currentPlayer: boolean, playerEvent: TCharacterCallback = null) {
    this._gameBuilder = gameBuilder;
    this.stats = stats;
    if (currentPlayer) {
      this._character = new Character(
        this._gameBuilder.getGameRenderer(),
        new Vector3(initialPosition[0] - 0.5, 0, initialPosition[1] - 0.5),
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
                const position = this._character.getPosition();
                this.dropBomb(position);
              }
            },
            {
              key: 'internal_space',
              onlyOnPress: true,
              callback: () => {
                const position = this._character.getPosition();
                this.dropBomb(position);
              }
            }
          ]
        },
        null, // networking
        {
          shadowEnabled: this._gameBuilder.getGameGraphicsOptions().charactersShadowEnabled,
          shadowQuality: this._gameBuilder.getGameGraphicsOptions().charactersShadowQuality
        },
        playerEvent
      );
      this._character.buildFromGallery(character.characterModel, () => {
        const camera = this._gameBuilder.getGameRenderer().getCamera();
        camera.parent = this._character.getModelRoot();
        camera.position.z = -30;
        camera.rotation.x = Math.PI / 6;
        camera.position.y = 30;
      });

    } else {
      this._character = new Character(
        this._gameBuilder.getGameRenderer(),
        new Vector3(initialPosition[0] - 0.5, 0, initialPosition[1] - 0.5),
        null,
        null,
        {
          shadowEnabled: this._gameBuilder.getGameGraphicsOptions().charactersShadowEnabled,
          shadowQuality: this._gameBuilder.getGameGraphicsOptions().charactersShadowQuality
        }
      );
      this._character.buildFromGallery(character.characterModel, () => {
        // TODO: after character load
      });

    }
  }

  getCharacter() {
    return this._character;
  }

  dropBomb(position) {
    if (this.stats.currentBombsCount >= this.stats.maxBombs) {
      return false;
    }
    const fixedPosition = this._gameBuilder.getGameMap().fixPosition(position.x, position.z);
    if (this._gameBuilder.getGameMap().addBomb(fixedPosition.cellX, fixedPosition.cellY)) {
      this.stats.currentBombsCount++;
      const bomb = new BombermanPlayerBomb(this._gameBuilder, this.stats, new Vector3(fixedPosition.x, 0.15, fixedPosition.y),
        (bombPower: number) => {
          const directions = this._gameBuilder.getGameMap().getFlareDirections(fixedPosition.cellX, fixedPosition.cellY, bombPower);
          const cells = this._gameBuilder.flareDestroy(fixedPosition.cellX, fixedPosition.cellY, directions);
          this.stats.currentBombsCount--;
          setTimeout(() => {
            this._gameBuilder.flareDestroyPlayers(fixedPosition.cellX, fixedPosition.cellY, directions, cells);
          }, this.stats.bombFlareTimeout);
          // TODO: destroy walls
          return directions;
        },
        () => {
          if (!this._gameBuilder.getGameMap().removeBomb(fixedPosition.cellX, fixedPosition.cellY)) {
            // TODO: if cell doesn't contain bomb? maybe a bug somewhere. Seems to work perfect! :)
          }
        }
      );
      this._gameBuilder.getGameMap().setBomb(fixedPosition.cellX, fixedPosition.cellY, bomb);
    } else {
      // TODO: if cell not empty?
    }
    return true;
  }

  destroy() {
    if (this._character) {
      this._character.destroy();
      this._character = null;
    }
  }

}
