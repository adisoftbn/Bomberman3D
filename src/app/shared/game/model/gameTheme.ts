import { IBombermanGameTheme } from './gameTheme.interface';
import { DefaultAlgs } from '../defaultAlgorithms';

import { Vector4, Color4 } from 'babylonjs';

export class BombermanGameTheme implements IBombermanGameTheme {
  name: 'unknown-theme';
  title: 'Unknown theme';
  description: 'Insert description here';
  groundTextures = [
    'grass'
  ];
  wallTextures = {
    borderWalls: [
      'bricks', 'bricks2'
    ],
    indestructibleWalls: [
      'bricks', 'bricks2'
    ],
    destructibleWalls: [
      'aged-building-facade'
    ]
  };
  wallTypes = {
    borderWalls: [
      'cube'
    ],
    indestructibleWalls: [
      'cube'
    ],
    destructibleWalls: [
      'cube'
    ]
  };
  avilableCharacters = [
    'rabbit', 'dude'
  ];
  bombTexture1 = 'small-items-metal2';
  bombTexture2 = 'small-items-metal2';
  fireColor1 = [226, 88, 34, 1.0];
  fireColor2 = [255, 0, 0, 1.0];
  fireColor3 = [226, 184, 0.2, 0.0];
  fireParticlesTexture = 'particles-flare';
  backgroundColor = [];

  indestructibleWallPlacementAlgorithm = DefaultAlgs.defaultIndestructibleWallPlacementAlgorithm;
  destructibleWallPlacementAlgorithm = DefaultAlgs.defaultDestructibleWallPlacementAlgorithm;
  playerPlacementAlgorithm = DefaultAlgs.defaultPlayerPlacementAlgorithm;

  getFireColor1(): Color4 {
    return new Color4(this.fireColor1[0], this.fireColor1[1], this.fireColor1[2], this.fireColor1[3]);
  }

  getFireColor2(): Color4 {
    return new Color4(this.fireColor2[0], this.fireColor2[1], this.fireColor2[2], this.fireColor2[3]);
  }

  getFireColor3(): Color4 {
    return new Color4(this.fireColor3[0], this.fireColor3[1], this.fireColor3[2], this.fireColor3[3]);
  }

  getBackgroundColor(): Color4 {
    return new Color4(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], this.backgroundColor[3]);
  }

}
