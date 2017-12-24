import { BombermanGameTheme, IBombermanGameTheme } from './models';
import { DefaultAlgs } from './defaultAlgorithms';


export class GameThemes {
  public themes: IBombermanGameTheme[] = [
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

  constructor() {
    this.initGameThemes();
  }

  initGameThemes() {

  }
  getThemeByName(themeName) {
    let foundTheme = null;
    this.themes.some(theme => {
      if (theme.name === themeName) {
        foundTheme = theme;
        return true;
      }
    });
    if (!foundTheme) {
      throw new Error(`Theme ${themeName} cannot be found!`);
    }
    return foundTheme;
  }
}
