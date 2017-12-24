import { BombermanGameTheme, IBombermanGameTheme } from './models';
import { DefaultAlgs } from './defaultAlgorithms';


export class GameThemes {
  public themes: IBombermanGameTheme[] = [
    {
      name: 'theme1',
      title: 'Green land',
      description: 'Unknown description',
      groundTextures: [
        'grass'
      ],
      wallTextures: {
        indestructibleWalls: [
          'bricks', 'bricks2'
        ],
        destructibleWalls: [
          'aged-building-facade'
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

  constructor() {
    this.initGameThemes();
  }

  initGameThemes() {

  }
}
