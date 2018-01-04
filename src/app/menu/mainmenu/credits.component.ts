import { Component, OnInit } from '@angular/core';

import { gameMemoryStorage } from '../../shared/gameMemoryStorage';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    gameMemoryStorage.enterMenuMode();
  }
}
