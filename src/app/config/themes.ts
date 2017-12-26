import { DefaultAlgs } from '../game/defaultAlgorithms';

export const themesData = [
  {
    name: 'theme1',
    title: 'Green land',
    description: 'Unknown description',
    groundTextures: [
      'ground-grass'
    ],
    wallTextures: {
      indestructibleWalls: [
        'wall-bricks', 'wall-bricks2'
      ],
      destructibleWalls: [
        'wall-aged-building-facade'
      ]
    },
    avilableCharacters: [
      'rabbit', 'dude'
    ],
    indestructibleWallPlacementAlgorithm: DefaultAlgs.defaultIndestructibleWallPlacementAlgorithm,
    destructibleWallPlacementAlgorithm: DefaultAlgs.defaultDestructibleWallPlacementAlgorithm,
    playerPlacementAlgorithm: DefaultAlgs.defaultPlayerPlacementAlgorithm,
  }
];
