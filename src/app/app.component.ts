import { Component, AfterViewInit, Renderer, OnInit } from '@angular/core';


import {
  BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions, BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from './shared/game/model/options';

import { environment } from '../environments/environment';

import { gameMemoryStorage } from './shared/gameMemoryStorage';

import * as MobileDetect from 'mobile-detect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  private globalKeyPress: Function;
  private globalKeyUp: Function;
  private globalKeyDown: Function;

  gameMemoryStorage = null;
  constructor(renderer: Renderer) {
    this.gameMemoryStorage = gameMemoryStorage;
    this.gameMemoryStorage.initGraphicsOptions(
      (environment.graphicsOptions === 'low' ?
        new BombermanLowGraphicsOptions() :
        (environment.graphicsOptions === 'medium' ?
          new BombermanMediumGraphicsOptions() :
          (environment.graphicsOptions === 'high' ?
            new BombermanHighGraphicsOptions() :
            new BombermanVeryLowGraphicsOptions()
          )
        )
      )
    );
    this.globalKeyPress = renderer.listenGlobal('document', 'keypress', (event) => {
      gameMemoryStorage.keyPressCallback(event);
    });
    this.globalKeyUp = renderer.listenGlobal('window', 'keyup', (event) => {
      gameMemoryStorage.keyUpCallback(event);
    });
    this.globalKeyDown = renderer.listenGlobal('window', 'keydown', (event) => {
      gameMemoryStorage.keyDownCallback(event);
    });
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    if (environment.forceMobileControl || mobileDetect.mobile()) {
      gameMemoryStorage.forceMobileControl = true;
    }
  }

  placeBomb(event) {
    event.stopPropagation();
    event.preventDefault();
    gameMemoryStorage.keyPressCallback({ keyCode: 'internal_space' });
  }

  ngOnInit() {
    gameMemoryStorage.initGamerRenderer('renderCanvas');
    gameMemoryStorage.enterMenuMode();
  }

  ngAfterViewInit() {
  }

}
