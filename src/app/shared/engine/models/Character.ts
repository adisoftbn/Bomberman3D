import { IGameRenderer } from '../';
import { BaseModel } from './BaseModel';

export class Character extends BaseModel {
  constructor(gameRenderer: IGameRenderer, modelName: string, path: string, modelFileName: string) {
    super(gameRenderer);
    this._gameRenderer = gameRenderer;
    const scene = gameRenderer.getScene();
    BABYLON.SceneLoader.ImportMesh(modelName, path, modelFileName, scene,
      function (newMeshes, particleSystems, skeletons) {
        this._model = newMeshes[1];

        this._model.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        gameRenderer.getShadowGenerator().getShadowMap().renderList.push(this._model);

        scene.beginAnimation(skeletons[0], 0, 100, true, 0.8);
      });
  }
}
