import { IBombermanGameTheme } from './gameTheme.interface';
import { DefaultAlgs } from '../defaultAlgorithms';
export class BombermanGameTheme implements IBombermanGameTheme {
  name: 'unknown-theme';
  title: 'Unknown theme';
  description: 'Insert description here';
  groundTextures = [
    'grass'
  ];
  wallTextures = {
    indestructibleWalls: [
      'bricks', 'bricks2'
    ],
    destructibleWalls: [
      'aged-building-facade'
    ]
  };
  avilableCharacters = [
    'rabbit', 'dude'
  ];
  indestructibleWallPlacementAlgorithm = DefaultAlgs.defaultIndestructibleWallPlacementAlgorithm;
  destructibleWallPlacementAlgorithm = DefaultAlgs.defaultDestructibleWallPlacementAlgorithm;
  playerPlacementAlgorithm = DefaultAlgs.defaultPlayerPlacementAlgorithm;
}
