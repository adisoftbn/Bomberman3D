import {
  Engine, Scene, FollowCamera, Light, DirectionalLight, IShadowLight,
  Vector3, HemisphericLight, MeshBuilder, ShadowGenerator, ArcRotateCamera, StandardMaterial, Color3
} from 'babylonjs';


import { IGameRenderer } from './GameRenderer.interface';
import { CharacterGalleryManager } from './gallery';


export class GameRenderer implements IGameRenderer {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera: ArcRotateCamera;
  private _light: IShadowLight;
  private _shadowGenerator: ShadowGenerator;
  private _characterGallery: CharacterGalleryManager;
  constructor(canvasElement: string) {
    this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
    this._engine = new Engine(this._canvas, true);
    this._engine.enableOfflineSupport = false;
    this._characterGallery = new CharacterGalleryManager(this);
  }

  public createScene() {
    this._scene = new Scene(this._engine);
    this._light = new DirectionalLight('light1', new Vector3(0, -0.5, -1.0), this._scene);
    this._camera = new ArcRotateCamera('camera1', 0, 0, 10, new Vector3(0, 30, 0), this._scene);

    this._scene.ambientColor = new Color3(0.3, 0.3, 0.3);

    this._light.position = new Vector3(20, 150, 70);

    this._camera.attachControl(this._canvas, true);
    this._camera.setPosition(new BABYLON.Vector3(0, 40, 12));
    this._camera.minZ = 10.0;


    const ground = MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, this._scene);
    const groundMaterial = new StandardMaterial('ground', this._scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
    groundMaterial.specularColor = new Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    this._shadowGenerator = new ShadowGenerator(2048, this._light);

  }

  public getScene(): Scene {
    return this._scene;
  }

  public getCamera() {
    return this._camera;
  }

  public getShadowGenerator() {
    return this._shadowGenerator;
  }

  public getCharacterGallery() {
    return this._characterGallery;
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
