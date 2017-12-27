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
    wallTypes: {
      borderWalls: [
        'cube'
      ],
      indestructibleWalls: [
        'cube', 'small-cube', 'cylinder', 'sphere'
      ],
      destructibleWalls: [
        'cube', 'small-cube', 'cylinder', 'sphere'
      ]
    },
    avilableCharacters: [
      'rabbit', 'dude'
    ],

    bombTexture1: 'small-items-metal2',
    bombTexture2: 'small-items-metal2',
    fireColor1: [226, 88, 34, 1.0],
    fireColor2: [255, 0, 0, 1.0],
    fireColor3: [226, 184, 0.2, 0.0],
    fireParticlesTexture: 'particles-flare',
    backgroundColor: [],

    indestructibleWallPlacementAlgorithm: DefaultAlgs.defaultIndestructibleWallPlacementAlgorithm,
    destructibleWallPlacementAlgorithm: DefaultAlgs.defaultDestructibleWallPlacementAlgorithm,
    playerPlacementAlgorithm: DefaultAlgs.defaultPlayerPlacementAlgorithm,
  }
];
