import { IBaseModel } from './BaseModel.interface';
import { IGameRenderer } from '../';

export class BaseModel implements IBaseModel {
  private _model = null;
  protected _gameRenderer = null;
  constructor(gameRenderer: IGameRenderer) {
    this._gameRenderer = gameRenderer;
  }

  moveForward() {

  }
  moveBackward() {

  }
  rotateLeft(angle) {

  }
  rotateRight(angle) {

  }
}
