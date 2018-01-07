import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


import { gameMemoryStorage } from '../shared/gameMemoryStorage';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    if (!(gameMemoryStorage as any)._gameMode) {
      if (environment.openGameAutomatically) {
        gameMemoryStorage.enterGameMode();
        gameMemoryStorage.buildDemoGame();
      } else {
        this.router.navigateByUrl('/');
      }
    }
  }

}
