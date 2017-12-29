import { Component, AfterViewInit } from '@angular/core';


import { gameMemoryStorage } from '../shared/gameMemoryStorage';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {
    gameMemoryStorage.buildNewGame();
    console.log('lalal');
  }

}
