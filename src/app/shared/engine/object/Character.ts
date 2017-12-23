import { Vector3, SceneLoader, MeshBuilder } from 'babylonjs';

import { IGameRenderer } from '../';
import { BaseModel } from './BaseModel';

export class Character extends BaseModel {

  protected _model = null;
  protected _modelhead = null;
  protected _animations = {};
  protected _skeletons = [];

  public animationSpeed = 0.8;

  constructor(gameRenderer: IGameRenderer) {
    super(gameRenderer);
    this._gameRenderer = gameRenderer;
    this._modelhead = MeshBuilder.CreateSphere('', { segments: 16, diameter: 0.01 }, this._gameRenderer.getScene());

    this._modelhead.position.y = 6;


  }

  getModel() {
    return this._model;
  }

  getModelHead() {
    return this._modelhead;
  }

  public buildFromUrl(modelName: string, path: string, modelFileName: string, callback?: Function) {
    const scene = this._gameRenderer.getScene();
    SceneLoader.ImportMesh(modelName, path, modelFileName, scene,
      (newMeshes, particleSystems, skeletons) => {
        this.importMeshSuccess(newMeshes, particleSystems, skeletons);
        if (callback) {
          callback();
        }
      });
  }

  public buildFromGallery(modelName, callback?: Function) {
    const model = this._gameRenderer.getCharacterGallery().getModelByName(modelName);
    console.log(model);
    if (model) {
      this._animations = model.animations;
      const scene = this._gameRenderer.getScene();
      SceneLoader.ImportMesh('', model.modelPath, model.modelFileName, scene,
        (newMeshes, particleSystems, skeletons) => {
          this.importMeshSuccess(newMeshes, particleSystems, skeletons);
          if (callback) {
            callback();
          }
        });
    }
  }
  switchToAnimation(animationName) {
    if (this._animations[animationName]) {
      this._gameRenderer.getScene().beginAnimation(
        this._skeletons[0],
        this._animations[animationName][0],
        this._animations[animationName][1],
        true,
        this.animationSpeed
      );
    }
  }

  private importMeshSuccess(newMeshes, particleSystems, skeletons) {
    try {
      if (newMeshes.length > 0) {
        const scene = this._gameRenderer.getScene();
        this._skeletons = skeletons;
        this._model = newMeshes[0];
        this._model.scaling = new Vector3(0.1, 0.1, 0.1);
        this._gameRenderer.getShadowGenerator().getShadowMap().renderList.push(this._model);
        // scene.beginAnimation(skeletons[0], 0, 500, true, 0.8);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
