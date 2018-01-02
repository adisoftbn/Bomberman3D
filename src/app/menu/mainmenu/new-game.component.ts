import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  mapSize = 2;
  mapSizes = [2, 3, 4, 6, 8];
  currentGameType = null;
  gameTypes = [
    'single',
    'create',
    'join',
  ];
  currentTheme = null;
  themes = [
    {
      label: 'Greenland',
      name: 'theme1'
    },
    {
      label: 'Rocky land',
      name: 'theme-rocky'
    },
  ];

  playerTypes = [
    {
      label: 'None',
      type: 'none',
    },
    {
      label: 'You',
      type: 'current',
    },
    {
      label: 'Computer easy',
      type: 'computerEasy',
    },
    {
      label: 'Computer medium',
      type: 'computerMedium',
    },
    {
      label: 'Computer hard',
      type: 'computerHard',
    },
  ];
  playersCount = ['player1', 'player2'];

  characters = [
    {
      label: 'Rabbit',
      type: 'rabbit',
    },
    {
      label: 'Mage',
      type: 'mage',
    },
    {
      label: 'Female Mage',
      type: 'female-mage',
    },
    {
      label: 'Archer',
      type: 'archer',
    },
    {
      label: 'Diablous',
      type: 'diablous',
    },
  ];

  players = {
    player1: {
      playerType: 'current',
      playerTypeLabel: 'You',
      character: 'rabbit',
      characterLabel: 'Rabbit'
    },
    player2: {
      playerType: 'computerEasy',
      playerTypeLabel: 'Computer easy',
      character: 'mage',
      characterLabel: 'Mage'
    },
    player3: {
      playerType: 'none',
      playerTypeLabel: 'None',
      character: 'female-mage',
      characterLabel: 'Female Mage'
    },
    player4: {
      playerType: 'none',
      playerTypeLabel: 'None',
      character: 'archer',
      characterLabel: 'Archer'
    },
    player5: {
      playerType: 'none',
      playerTypeLabel: 'None',
      character: 'diablous',
      characterLabel: 'Diablous'
    },
    player6: {
      playerType: 'none',
      playerTypeLabel: 'None',
      character: 'rabbit',
      characterLabel: 'Rabbit'
    },
    player7: {
      playerType: 'none',
      playerTypeLabel: 'None',
      character: 'mage',
      characterLabel: 'Mage'
    },
    player8: {
      playerType: 'none',
      playerTypeLabel: 'None',
      character: 'female-mage',
      characterLabel: 'Female Mage'
    }
  };

  constructor(public route: ActivatedRoute) {
    this.currentTheme = this.themes[0];
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.currentGameType = params['gameType'];
        if (this.currentGameType !== null && this.gameTypes.indexOf(this.currentGameType) < 0) {
          this.currentGameType = null;
        }
      });
  }

  switchToMapSize(newSize) {
    if (this.mapSizes.indexOf(newSize) >= 0) {
      this.mapSize = newSize;
      this.playersCount = [];
      for (let i = 1; i <= this.mapSize; i++) {
        this.playersCount.push('player' + i);
      }
    }
  }

  switchToTheme(theme) {
    this.currentTheme = theme;
  }

  switchPlayerType(playerType) {

  }

  switchPlayerCharacter(character) {

  }

}
