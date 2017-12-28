import { Vector3, MeshBuilder, Mesh, ParticleSystem } from 'babylonjs';

import { Sphere, Torus, ParticleEmitter } from '../../engine/object';

import { GameBuilder } from '../';
import { IBombermanPlayerStats } from '../model';

export enum EPlayerBombStage {
  initialTimeElapse = 'step1',
  explosionStarting = 'step2',
  explosionFlaresEnding = 'step3',
  explosionFlaresClear = 'step4',
  explosionEnding = 'step5',
  explosionDone = 'step6',
  cleanUp = 'step7'
}

export class BombermanPlayerBomb {
  private _gameBuilder: GameBuilder;
  private _forcedKill = false;
  constructor(gameBuilder: GameBuilder, playerStats: IBombermanPlayerStats, position: Vector3,
    scanMapCallback: Function, doneCallback: Function
  ) {
    this._gameBuilder = gameBuilder;

    const cachedBombTimeout = playerStats.bombTimeout;
    const cachedBombPower = playerStats.bombPower;

    const sphere = new Sphere(this._gameBuilder.getGameRenderer(), new Vector3(position.x, 0.15, position.z), 0.3, {
      shadowEnabled: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowEnabled,
      shadowQuality: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowQuality
    });

    const torus = new Torus(this._gameBuilder.getGameRenderer(), new Vector3(0.1, 0.1, 0), 0.05, 0.05, {
      shadowEnabled: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowEnabled,
      shadowQuality: this._gameBuilder.getGameGraphicsOptions().temporaryItemsShadowQuality
    });

    const torusModel = torus.getModel();
    const sphereModel = sphere.getModel();

    torusModel.parent = sphereModel;
    torusModel.position.y = 0.1;
    torusModel.position.x = 0.1;
    torusModel.rotate(BABYLON.Axis.Z, -Math.PI / 4, BABYLON.Space.LOCAL);

    const particles = new ParticleEmitter(
      this._gameBuilder.getGameRenderer(),
      sphereModel,
      {
        start: new BABYLON.Vector3(0.05, 0.05, 0),
        end: new BABYLON.Vector3(0.2, 0.2, 0),
      },
      {
        direction1: new BABYLON.Vector3(0.1, 0.1, 0),
        direction2: new BABYLON.Vector3(0.1, 0.1, 0)
      },
      {
        color1: this._gameBuilder.getGameTheme().getFireColor1(),
        color2: this._gameBuilder.getGameTheme().getFireColor2(),
        deadColor: this._gameBuilder.getGameTheme().getFireColor3()
      },
      {
        minSize: 0.1,
        maxSize: 0.5,
        minLifeTime: 0.5,
        maxLifeTime: 1.5,
        emitRate: 150,
        maxParticles: 2000
      }
    );
    particles.setTextureFromGallery(this._gameBuilder.getGameTheme().fireParticlesTexture);


    const startTime = performance.now();
    const endTime = startTime + cachedBombTimeout;

    sphere.setTextureFromGallery(this._gameBuilder.getGameTheme().bombTexture1);
    torus.setTextureFromGallery(this._gameBuilder.getGameTheme().bombTexture2);
    let exploded = false;
    let explosionStage: EPlayerBombStage = EPlayerBombStage.initialTimeElapse;
    let flares = {};
    let bombTimeout = null;
    sphereModel.registerBeforeRender((mesh) => {
      if (this._forcedKill && explosionStage === EPlayerBombStage.initialTimeElapse) {
        this._forcedKill = false;
        clearTimeout(bombTimeout);
        explosionStage = EPlayerBombStage.explosionStarting;
      }
      if (explosionStage === EPlayerBombStage.initialTimeElapse) {
        if (!exploded) {
          const elapsedTime = performance.now() - startTime;
          const scaleValue = (Math.sin((elapsedTime / cachedBombTimeout) * 10 * Math.PI) + 1) / 4 + 0.9;
          mesh.scaling.set(scaleValue, scaleValue, scaleValue);
        }
      } else if (explosionStage === EPlayerBombStage.explosionStarting) {
        explosionStage = EPlayerBombStage.explosionFlaresEnding;
        sphereModel.scaling.set(1, 1, 1);
        particles.stop();
        const result = scanMapCallback(cachedBombPower);
        flares = this.createFireFlares(sphereModel, result.x1, result.x2, result.y1, result.y2);
        setTimeout(() => {
          explosionStage = EPlayerBombStage.explosionFlaresClear;
        }, 300);
      } else if (explosionStage === EPlayerBombStage.explosionFlaresClear) {
        explosionStage = EPlayerBombStage.explosionEnding;
        (flares as any).maxX1Particles.stop();
        (flares as any).maxX2Particles.stop();
        (flares as any).maxY1Particles.stop();
        (flares as any).maxY2Particles.stop();
        sphereModel.material.alpha = 0;
        torusModel.material.alpha = 0;
        particles.destroy();
        setTimeout(() => {
          explosionStage = EPlayerBombStage.explosionDone;
        }, 300);
      } else if (explosionStage === EPlayerBombStage.explosionDone) {
        explosionStage = EPlayerBombStage.cleanUp;
        (flares as any).maxX1Particles.destroy();
        (flares as any).maxX2Particles.destroy();
        (flares as any).maxY1Particles.destroy();
        (flares as any).maxY2Particles.destroy();
        torus.destroy();
        doneCallback();
      }
    });

    bombTimeout = setTimeout(() => {
      explosionStage = EPlayerBombStage.explosionStarting;
      exploded = true;
    }, cachedBombTimeout);
  }

  createFireFlares(model: Mesh, maxX1: number, maxX2: number, maxY1: number, maxY2: number) {
    const particleOptions = {
      minSize: 1,
      maxSize: 3,
      minLifeTime: 0.0,
      maxLifeTime: 0.5,
      emitRate: 1500,
      maxParticles: 2000,
      noGravity: true,
      minEmitPower: 1,
      maxEmitPower: 1,
      updateSpeed: 0.1
    };

    const particleColors = {
      color1: this._gameBuilder.getGameTheme().getFireColor1(),
      color2: this._gameBuilder.getGameTheme().getFireColor2(),
      deadColor: this._gameBuilder.getGameTheme().getFireColor3()
    };

    const maxX1Particles = new ParticleEmitter(
      this._gameBuilder.getGameRenderer(),
      model,
      {
        start: new BABYLON.Vector3(0, 0, -0.2),
        end: new BABYLON.Vector3(maxX1 - 0.5, 0, 0.2),
      },
      {
        direction1: new BABYLON.Vector3(1, 0, 0),
        direction2: new BABYLON.Vector3(1, 0, 0)
      },
      particleColors,
      particleOptions
    );
    maxX1Particles.setTextureFromGallery(this._gameBuilder.getGameTheme().fireParticlesTexture);

    const maxX2Particles = new ParticleEmitter(
      this._gameBuilder.getGameRenderer(),
      model,
      {
        start: new BABYLON.Vector3(0, 0, -0.2),
        end: new BABYLON.Vector3(-maxX2 + 0.5, 0, 0.2),
      },
      {
        direction1: new BABYLON.Vector3(-1, 0, 0),
        direction2: new BABYLON.Vector3(-1, 0, 0)
      },
      particleColors,
      particleOptions
    );
    maxX2Particles.setTextureFromGallery(this._gameBuilder.getGameTheme().fireParticlesTexture);

    const maxY1Particles = new ParticleEmitter(
      this._gameBuilder.getGameRenderer(),
      model,
      {
        start: new BABYLON.Vector3(-0.2, 0, 0),
        end: new BABYLON.Vector3(0.2, 0, maxY1 - 0.5),
      },
      {
        direction1: new BABYLON.Vector3(0, 0, 1),
        direction2: new BABYLON.Vector3(0, 0, 1)
      },
      particleColors,
      particleOptions
    );
    maxY1Particles.setTextureFromGallery(this._gameBuilder.getGameTheme().fireParticlesTexture);

    const maxY2Particles = new ParticleEmitter(
      this._gameBuilder.getGameRenderer(),
      model,
      {
        start: new BABYLON.Vector3(-0.2, 0, 0),
        end: new BABYLON.Vector3(0.2, 0, -maxY2 + 0.5),
      },
      {
        direction1: new BABYLON.Vector3(0, 0, -1),
        direction2: new BABYLON.Vector3(0, 0, -1)
      },
      particleColors,
      particleOptions
    );
    maxY2Particles.setTextureFromGallery(this._gameBuilder.getGameTheme().fireParticlesTexture);

    return {
      maxX1Particles,
      maxX2Particles,
      maxY1Particles,
      maxY2Particles
    }
  }
  public forceKill() {
    this._forcedKill = true;
  }
}

