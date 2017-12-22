import {
  Engine, Scene, FollowCamera, Light, DirectionalLight, IShadowLight,
  Vector3, HemisphericLight, MeshBuilder, ShadowGenerator
} from 'babylonjs';


import { IGameRenderer } from './GameRenderer.interface';


export class GameRenderer implements IGameRenderer {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera: FollowCamera;
  private _light: IShadowLight;
  private _shadowGenerator: ShadowGenerator;
  constructor(canvasElement: string) {
    this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
    this._engine = new Engine(this._canvas, true);
  }

  public createScene() {
    this._scene = new Scene(this._engine);

    this._camera = new FollowCamera('camera1', new Vector3(0, 5, -10), this._scene);

    this._camera.attachControl(this._canvas, true);

    this._light = new DirectionalLight('light1', new Vector3(0, 1, 0), this._scene);

    const sphere = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, this._scene);
    this._camera.lockedTarget = sphere;
    this._shadowGenerator = new BABYLON.ShadowGenerator(1024, this._light);

    sphere.position.y = 1;

    const ground = MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, this._scene);
  }

  public getScene(): Scene {
    return this._scene;
  }

  public getCamera() {
    return this._camera;
  }

  public getShadowGenerator() {

  }

  public animate() {
    // run the render loop
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }
}
