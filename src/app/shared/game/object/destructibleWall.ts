import { Vector3, StandardMaterial, MeshBuilder, Mesh, Vector4, Texture } from 'babylonjs';

import { GameRenderer, IRendererGraphicOptions, RendererGraphicOptions, ERendererShadowQuality } from '../../engine';
import { BaseModel } from '../../engine/object';
import { EBombermanWallType } from '../model';

import { GameBuilder } from '../';

export class DestructibleWall extends BaseModel {
  protected _gameBuilder: GameBuilder;
  protected _graphicsOptions: IRendererGraphicOptions;
  protected _meshType: EBombermanWallType
  protected _model: Mesh = null;
  protected _modelMaterial;

  protected _initialWidth = 1;
  protected _initialHeight = 1;
  protected _initialDepth = 1;
  protected _initialPosition: Vector3;
  protected _modelBuilt = false;
  protected _textureLoaded = false;
  protected _textureWidth = 1;
  protected _textureHeight = 1;

  constructor(gameBuilder: GameBuilder, initialPosition: Vector3, meshType: EBombermanWallType
  ) {
    super(gameBuilder.getGameRenderer());
    this._gameBuilder = gameBuilder;
    this._meshType = meshType;
    this._graphicsOptions = {
      shadowEnabled: this._gameBuilder.getGameGraphicsOptions().destructibleWallShadowEnabled,
      shadowQuality: this._gameBuilder.getGameGraphicsOptions().destructibleWallShadowQuality
    };
    this._initialPosition = initialPosition;
    this._modelMaterial = new StandardMaterial('model', this._gameRenderer.getScene());
    this._modelMaterial.diffuseColor = this._gameRenderer.diffuseColor;
    this._modelMaterial.specularColor = this._gameRenderer.specularColor;
    this._modelMaterial.ambientColor = this._gameRenderer.ambientColor;

  }
  private buildModel() {
    if (this._modelBuilt) {
      return;
    }
    this._modelBuilt = true;
    const modelImpostor = BABYLON.PhysicsImpostor.BoxImpostor;
    if (this._meshType === EBombermanWallType.cube || this._meshType === EBombermanWallType.smallCube) {
      const faces = [];
      if (this._textureLoaded) {
        const ratio = this._textureWidth / this._textureHeight;
        faces.push(new Vector4(0, 0, this._initialWidth / ratio, this._initialHeight * ratio));
        faces.push(new Vector4(0, 0, this._initialWidth / ratio, this._initialHeight * ratio));
        faces.push(new Vector4(0, 0, this._initialHeight * ratio, this._initialDepth * ratio)); // 1
        faces.push(new Vector4(0, 0, this._initialHeight * ratio, this._initialDepth * ratio));
        faces.push(new Vector4(0, 0, this._initialDepth / ratio, this._initialWidth * ratio));
        faces.push(new Vector4(0, 0, this._initialDepth / ratio, this._initialWidth * ratio));
      } else {
        faces.push(new Vector4(0, 0, 1, 1));
        faces.push(new Vector4(0, 0, 1, 1));
        faces.push(new Vector4(0, 0, 1, 1));
        faces.push(new Vector4(0, 0, 1, 1));
        faces.push(new Vector4(0, 0, 1, 1));
        faces.push(new Vector4(0, 0, 1, 1));
      }
      let width = 1;
      const height = 0.7;
      let depth = 1;
      if (this._meshType === EBombermanWallType.smallCube) {
        width = 0.7;
        depth = 0.7;
      }
      this._model = MeshBuilder.CreateBox('', {
        width,
        height,
        depth,
        faceUV: faces
      }, this._gameRenderer.getScene());
    } else if (this._meshType === EBombermanWallType.cylinder) {
      // modelImpostor = BABYLON.PhysicsImpostor.CylinderImpostor;
      this._model = MeshBuilder.CreateCylinder('', {
        height: 0.7,
        diameter: 0.7,
        // faceUV: faces
      }, this._gameRenderer.getScene());
    } else if (this._meshType === EBombermanWallType.sphere) {
      // modelImpostor = BABYLON.PhysicsImpostor.SphereImpostor;
      this._model = MeshBuilder.CreateSphere('', {
        diameter: 0.7,
        // faceUV: faces
      }, this._gameRenderer.getScene());
    }

    // this._model.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
    this._model.position = this._initialPosition;
    this._model.material = this._modelMaterial;
    if (this._graphicsOptions.shadowEnabled && this._gameRenderer.getShadowGenerator()) {
      if (
        this._graphicsOptions.shadowQuality === ERendererShadowQuality.medium ||
        this._graphicsOptions.shadowQuality === ERendererShadowQuality.high
      ) {
        this._model.receiveShadows = true;
      }
      this._gameRenderer.getShadowGenerator().getShadowMap().renderList.push(this._model);
      this._gameRenderer.getShadowGenerator().addShadowCaster(this._model);
    }
    if (this._gameRenderer.isPhysicsEnabled()) {
      if (this._gameRenderer.isRealPhysicsCollisions()) {
        this._model.physicsImpostor = new BABYLON.PhysicsImpostor(
          this._model, modelImpostor, { mass: 0, restitution: 0 },
          this._gameRenderer.getScene()
        );
      } else {
        this._model.checkCollisions = true;
        this._model.useOctreeForCollisions = true;
        const octree = this._gameRenderer.getScene().createOrUpdateSelectionOctree();
        octree.dynamicContent.push(this._model);
      }
    }
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

  public killWall(finishCallback: Function) {
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
