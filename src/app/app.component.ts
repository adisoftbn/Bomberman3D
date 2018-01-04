import { Component, AfterViewInit, Renderer } from '@angular/core';

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
  private globalKeyPress: Function;
  private globalKeyUp: Function;
  private globalKeyDown: Function;
  constructor(renderer: Renderer) {
    if (environment.graphicsOptions === 'low') {
      gameMemoryStorage.graphicsOptions = new BombermanLowGraphicsOptions();
    } else if (environment.graphicsOptions === 'medium') {
      gameMemoryStorage.graphicsOptions = new BombermanMediumGraphicsOptions();
    } else if (environment.graphicsOptions === 'high') {
      gameMemoryStorage.graphicsOptions = new BombermanHighGraphicsOptions();
    } else {
      gameMemoryStorage.graphicsOptions = new BombermanVeryLowGraphicsOptions();
    }

    this.globalKeyPress = renderer.listenGlobal('document', 'keypress', (event) => {
      gameMemoryStorage.keyPressCallback(event);
    });
    this.globalKeyUp = renderer.listenGlobal('window', 'keyup', (event) => {
      gameMemoryStorage.keyUpCallback(event);
    });
    this.globalKeyDown = renderer.listenGlobal('window', 'keydown', (event) => {
      gameMemoryStorage.keyDownCallback(event);
    });
  }

  ngAfterViewInit() {
    gameMemoryStorage.gameRenderer = new GameRenderer('renderCanvas', {
      shadowEnabled: gameMemoryStorage.graphicsOptions.worldShadowEnabled,
      shadowQuality: gameMemoryStorage.graphicsOptions.worldShadowQuality
    });
    gameMemoryStorage.gameRenderer.createScene();

    gameMemoryStorage.gameRenderer.getTextureGallery().initTextureObjects(texturesUrl);
    gameMemoryStorage.gameRenderer.getCharacterGallery().initCharacterObjects(charactersData);
    gameMemoryStorage.gameThemes = new GameThemes();
    gameMemoryStorage.gameThemes.initGameThemes(themesData);
    gameMemoryStorage.enterMenuMode();
  }

}
