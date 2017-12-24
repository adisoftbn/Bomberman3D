import { Vector3, StandardMaterial, MeshBuilder, Mesh, Vector4 } from 'babylonjs';

import { GameRenderer } from '../';
import { BaseModel } from './baseModel';

export class Cube extends BaseModel {
  protected _model: Mesh = null;
  protected _modelMaterial;

  protected _initialWidth = 1;
  protected _initialHeight = 1;
  protected _initialDepth = 1;

  constructor(gameRenderer: GameRenderer, initialPosition: Vector3, width, height, depth) {
    super(gameRenderer);
    this._gameRenderer = gameRenderer;
    this._initialWidth = width;
    this._initialHeight = height;
    this._initialDepth = depth;
    this._model = MeshBuilder.CreateBox('', {
      width, height, depth,
      // frontUVs: new Vector4(0, 0, width, height),
      // backUVs: new Vector4(0, 0, width, height)
    }, this._gameRenderer.getScene());
    this._model.position = initialPosition;

    this._modelMaterial = new StandardMaterial('model', this._gameRenderer.getScene());
    this._modelMaterial.diffuseColor = this._gameRenderer.diffuseColor;
    this._modelMaterial.specularColor = this._gameRenderer.specularColor;
    this._modelMaterial.backFaceCulling = false;
    this._model.material = this._modelMaterial;
    this._model.receiveShadows = true;
    if (this._gameRenderer.isPhysicsEnabled()) {
      this._model.checkCollisions = true;
    }

  }

  getModel() {
    return this._model;
  }

  public setTexture(textureUrl: string) {
    this._modelMaterial.diffuseTexture = new BABYLON.Texture(textureUrl, this._gameRenderer.getScene());
  }

  public setTextureFromGallery(textureName) {
    const textureUrl = this._gameRenderer.getTextureGallery().getTextureUrlByName(textureName);
    if (textureUrl) {
      this._modelMaterial.diffuseTexture = new BABYLON.Texture(textureUrl, this._gameRenderer.getScene());
      const interval = setInterval(() => {
        if (this._modelMaterial.diffuseTexture.isReady()) {
          clearInterval(interval);
          const sizes = this._modelMaterial.diffuseTexture.getSize();
          const ratio = sizes['width'] / sizes['height'];
          this._modelMaterial.diffuseTexture.uScale = (this._initialHeight / 10) * ratio;
          this._modelMaterial.diffuseTexture.vScale = (this._initialWidth / 10) / ratio;
        }
      }, 1);
    }
  }



}
