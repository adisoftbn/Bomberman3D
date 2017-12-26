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
      newThemeItem.avilableCharacters = theme.avilableCharacters;
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
