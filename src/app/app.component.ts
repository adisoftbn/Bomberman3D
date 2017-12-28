import { Component, AfterViewInit } from '@angular/core';

import { texturesUrl, charactersData, themesData } from './config';
import { GameRenderer } from './shared/engine';

import { GameThemes } from './shared/game';

import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from './shared/game/model/options';

import { environment } from '../environments/environment';

import { gameMemoryStorage } from './shared/gameMemoryStorage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor() {
    if (environment.graphicsOptions === 'low') {
      gameMemoryStorage.graphicsOptions = new BombermanLowGraphicsOptions();
    } else if (environment.graphicsOptions === 'medium') {
      gameMemoryStorage.graphicsOptions = new BombermanMediumGraphicsOptions();
    } else if (environment.graphicsOptions === 'high') {
      gameMemoryStorage.graphicsOptions = new BombermanHighGraphicsOptions();
    } else {
      gameMemoryStorage.graphicsOptions = new BombermanVeryLowGraphicsOptions();
    }
  }

  ngAfterViewInit() {
    gameMemoryStorage.gameRenderer = new GameRenderer('renderCanvas', {
      shadowEnabled: gameMemoryStorage.graphicsOptions.worldShadowEnabled,
      shadowQuality: gameMemoryStorage.graphicsOptions.worldShadowQuality
    });
    gameMemoryStorage.gameRenderer.createScene();
    gameMemoryStorage.gameRenderer.enterMenuMode();

    gameMemoryStorage.gameRenderer.getTextureGallery().initTextureObjects(texturesUrl);
    gameMemoryStorage.gameRenderer.getCharacterGallery().initCharacterObjects(charactersData);
    gameMemoryStorage.gameThemes = new GameThemes();
    gameMemoryStorage.gameThemes.initGameThemes(themesData);


  }

}
