import { Vector3 } from 'babylonjs';

import { IBombermanPlayer } from './player.interface';
import { BombermanPlayerBomb } from './playerBomb';
import { GameBuilder } from '../';

import { Character } from '../../shared/engine/object';
import { BombermanPlayerStats, EPlayerCharacterType, IBombermanPlayerModel } from '../model';

export class BombermanPlayer implements IBombermanPlayer {
  private _gameBuilder: GameBuilder;
  character: Character;
  stats: BombermanPlayerStats;

  constructor(gameBuilder: GameBuilder, character: IBombermanPlayerModel, initialPosition: number[], currentPlayer: boolean) {
    this._gameBuilder = gameBuilder;
    this.stats = new BombermanPlayerStats();
    if (currentPlayer) {
      this.character = new Character(
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
                const position = this.character.getPosition();
                this.dropBomb(position);
              }
            }
          ]
        },
        null, // networking
        {
          shadowEnabled: this._gameBuilder.getGameGraphicsOptions().charactersShadowEnabled,
          shadowQuality: this._gameBuilder.getGameGraphicsOptions().charactersShadowQuality
        }
      );
      this.character.buildFromGallery(character.characterModel, () => {
        const camera = this._gameBuilder.getGameRenderer().getCamera();
        camera.parent = this.character.getModelRoot();
        camera.position.z = -30;
        camera.rotation.x = Math.PI / 6;
        camera.position.y = 30;
      });

    } else {
      this.character = new Character(
        this._gameBuilder.getGameRenderer(),
        new Vector3(initialPosition[0] - 0.5, 0, initialPosition[1] - 0.5),
        null,
        null,
        {
          shadowEnabled: this._gameBuilder.getGameGraphicsOptions().charactersShadowEnabled,
          shadowQuality: this._gameBuilder.getGameGraphicsOptions().charactersShadowQuality
        }
      );
      this.character.buildFromGallery(character.characterModel, () => {
        // TODO: after character load
      });

    }
  }
  dropBomb(position) {
    const fixedPosition = this._gameBuilder.getGameMap().fixPosition(position.x, position.z);
    if (this._gameBuilder.getGameMap().addBomb(fixedPosition.cellX, fixedPosition.cellY)) {
      const bomb = new BombermanPlayerBomb(this._gameBuilder, this.stats, new Vector3(fixedPosition.x, 0.15, fixedPosition.y),
        (bombPower: number) => {
          const directions = this._gameBuilder.getGameMap().getFlareDirections(fixedPosition.cellX, fixedPosition.cellY, bombPower);
          this._gameBuilder.flareDestroy(fixedPosition.cellX, fixedPosition.cellY, directions);
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
  }

}
