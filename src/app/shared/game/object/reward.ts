import { Vector3, StandardMaterial, MeshBuilder, Mesh, Vector4, Texture } from 'babylonjs';

import { GameRenderer, IRendererGraphicOptions, RendererGraphicOptions, ERendererShadowQuality } from '../../engine';
import { BaseModel } from '../../engine/object';
import { EBombermanWallType, IBombermanGameReward } from '../model';

import { GameBuilder } from '../';

export class BombermanReward extends BaseModel {
  protected _gameBuilder: GameBuilder;
  protected _graphicsOptions: IRendererGraphicOptions;
  protected _model: Mesh = null;
  protected _gameReward: IBombermanGameReward;
  protected _modelMaterial;

  protected _initialWidth = 1;
  protected _initialHeight = 1;
  protected _initialDepth = 1;
  protected _initialPosition: Vector3;
  protected _modelBuilt = false;
  protected _textureLoaded = false;
  protected _textureWidth = 1;
  protected _textureHeight = 1;

  constructor(gameBuilder: GameBuilder, initialPosition: Vector3, gameReward: IBombermanGameReward) {
    super(gameBuilder.getGameRenderer());
    this._gameReward = gameReward;
    this._gameBuilder = gameBuilder;
    this._graphicsOptions = {
      shadowEnabled: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowEnabled,
      shadowQuality: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowQuality
    };
    this._initialPosition = initialPosition;
    this._modelMaterial = new StandardMaterial('model', this._gameRenderer.getScene());
    this._modelMaterial.diffuseColor = this._gameRenderer.diffuseColor;
    this._modelMaterial.specularColor = this._gameRenderer.specularColor;
    this._modelMaterial.ambientColor = this._gameRenderer.ambientColor;
    this.setTextureFromGallery(gameReward.texture);
  }

  private buildModel() {
    if (this._modelBuilt) {
      return;
    }
    this._modelBuilt = true;
    const width = 0.3;
    const height = 0.3;
    const depth = 0.3;
    this._model = MeshBuilder.CreateBox('', {
      width,
      height,
      depth,
    }, this._gameRenderer.getScene());
    this._model.registerBeforeRender((mesh) => {
      mesh.rotate(BABYLON.Axis.Y, Math.PI / 180, BABYLON.Space.LOCAL);
    });
    this._model.position = this._initialPosition;
    this._model.material = this._modelMaterial;
    if (this._graphicsOptions.shadowEnabled && this._gameRenderer.getShadowGenerator()) {
      if (
        this._graphicsOptions.shadowQuality === ERendererShadowQuality.high
      ) {
        this._model.receiveShadows = true;
      }
      if (
        this._graphicsOptions.shadowQuality === ERendererShadowQuality.medium ||
        this._graphicsOptions.shadowQuality === ERendererShadowQuality.high
      ) {
        this._gameRenderer.getShadowGenerator().getShadowMap().renderList.push(this._model);
        this._gameRenderer.getShadowGenerator().addShadowCaster(this._model);
      }
    }
  }

  public getGameReward(): IBombermanGameReward {
    return this._gameReward;
  }

  public getModel() {
    return this._model;
  }

  public setTexture(textureUrl: string) {
    this._modelMaterial.diffuseTexture = new Texture(textureUrl, this._gameRenderer.getScene());
  }

  public setTextureFromGallery(textureName) {
    this._gameRenderer.getTextureGallery().getTextureObjectByName(textureName).then(texture => {
      this._modelMaterial.diffuseTexture = texture;
      const sizes = this._modelMaterial.diffuseTexture.getSize();
      this._textureLoaded = true;
      this._textureWidth = sizes['width'];
      this._textureHeight = sizes['height'];
      this.buildModel();
    });
  }

  public killReward(finishCallback: Function) {
    const startTime = performance.now();
    const animationLength = 1000;
    const endTime = startTime + animationLength;
    let finished = false;
    this._model.registerBeforeRender((mesh) => {
      if (!finished) {
        if (performance.now() >= endTime) {
          finished = true;
          this._model.registerAfterRender(() => {
            finishCallback();
          });
        } else {
          const scaleValue = (endTime - performance.now()) / animationLength;
          mesh.scaling.set(scaleValue, scaleValue, scaleValue);
          mesh.material.alpha = scaleValue;
        }
      }
    });
  }

  public destroy() {
    if (this._model) {
      this._model.dispose();
      this._model = null;
    }
  }
}
