import { BombermanGameTheme, IBombermanGameTheme } from './model';


export class GameThemes {
  private _themes = {};

  constructor() {
  }

  public initGameThemes(themesData) {
    themesData.forEach(theme => {
      const newThemeItem = new BombermanGameTheme();
      newThemeItem.name = theme.name;
      newThemeItem.title = theme.title;
      newThemeItem.description = theme.description;
      newThemeItem.groundTextures = theme.groundTextures;
      newThemeItem.wallTextures = theme.wallTextures;
      newThemeItem.wallTypes = theme.wallTypes;
      newThemeItem.avilableCharacters = theme.avilableCharacters;

      newThemeItem.bombTexture1 = theme.bombTexture1;
      newThemeItem.bombTexture2 = theme.bombTexture2;
      newThemeItem.fireColor1 = theme.fireColor1;
      newThemeItem.fireColor2 = theme.fireColor2;
      newThemeItem.fireColor3 = theme.fireColor3;
      newThemeItem.fireParticlesTexture = theme.fireParticlesTexture;
      newThemeItem.backgroundColor = theme.backgroundColor;

      newThemeItem.indestructibleWallPlacementAlgorithm = theme.indestructibleWallPlacementAlgorithm;
      newThemeItem.destructibleWallPlacementAlgorithm = theme.destructibleWallPlacementAlgorithm;
      newThemeItem.playerPlacementAlgorithm = theme.playerPlacementAlgorithm;
      this._themes[theme.name] = newThemeItem;
    });

  }
  getThemeByName(themeName) {
    if (this._themes[themeName]) {
      return this._themes[themeName];
    } else {
      throw new Error(`Theme ${themeName} cannot be found!`);
    }
  }
}
