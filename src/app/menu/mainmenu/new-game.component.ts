import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { gameMemoryStorage } from '../../shared/gameMemoryStorage';
import { EPlayerCharacterType } from '../../shared/game/model';

import { charactersData, themesData } from '../../config';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit, AfterViewInit {
  mapSize = 2;
  mapSizes = [2, 3, 4, 6, 8];
  currentGameType = null;
  gameTypes = ['single', 'create', 'join'];
  currentTheme = null;
  themes = [];
  playerTypes = [
    {
      title: 'None',
      type: null,
    },
    {
      title: 'You',
      type: EPlayerCharacterType.current,
    },
    {
      title: 'Computer easy',
      type: EPlayerCharacterType.computerEasy,
    },
    {
      title: 'Computer medium',
      type: EPlayerCharacterType.computerMedium,
    },
    {
      title: 'Computer hard',
      type: EPlayerCharacterType.computerHard,
    },
  ];
  playersCount = [];

  characters = [];

  players = null;

  constructor(private router: Router, public route: ActivatedRoute) {
    themesData.forEach(theme => {
      this.themes.push({
        title: theme.title,
        name: theme.name
      });
    });
    this.currentTheme = this.themes[0];
    charactersData.forEach(character => {
      this.characters.push({
        title: character.title,
        name: character.name
      })
    });
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.currentGameType = params['gameType'];
        if (this.currentGameType !== null && this.gameTypes.indexOf(this.currentGameType) < 0) {
          this.currentGameType = null;
        }
        if (this.currentGameType === 'single') {
          this.playersCount = ['player1', 'player2'];
          this.players = {
            player1: {
              playerType: EPlayerCharacterType.current,
              playerTypeTitle: 'You',
              character: 'rabbit',
              characterTitle: 'Rabbit'
            },
            player2: {
              playerType: EPlayerCharacterType.computerEasy,
              playerTypeTitle: 'Computer easy',
              character: 'mage',
              characterTitle: 'Mage'
            },
            player3: {
              playerType: null,
              playerTypeTitle: 'None',
              character: 'female-mage',
              characterTitle: 'Female Mage'
            },
            player4: {
              playerType: null,
              playerTypeTitle: 'None',
              character: 'archer',
              characterTitle: 'Archer'
            },
            player5: {
              playerType: null,
              playerTypeTitle: 'None',
              character: 'diablous',
              characterTitle: 'Diablous'
            },
            player6: {
              playerType: null,
              playerTypeTitle: 'None',
              character: 'rabbit',
              characterTitle: 'Rabbit'
            },
            player7: {
              playerType: null,
              playerTypeTitle: 'None',
              character: 'mage',
              characterTitle: 'Mage'
            },
            player8: {
              playerType: null,
              playerTypeTitle: 'None',
              character: 'female-mage',
              characterTitle: 'Female Mage'
            }
          };
        }
      });
  }
  ngAfterViewInit() {
    gameMemoryStorage.enterMenuMode();
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

  removeCurrentPlayer(replaceWith = null) {
    for (let i = 1; i <= this.mapSize; i++) {
      if (this.players['player' + i].playerType === EPlayerCharacterType.current) {
        if (replaceWith) {
          this.players['player' + i].playerType = replaceWith.playerType;
          this.players['player' + i].playerTypeTitle = replaceWith.playerTypeTitle;
        } else {
          this.players['player' + i].playerType = null;
          this.players['player' + i].playerTypeTitle = 'None';
        }
      }
    }
  }

  switchPlayerType(playerIndex, playerType) {
    if (this.players[playerIndex].playerType !== EPlayerCharacterType.current) {
      if (playerType.type === EPlayerCharacterType.current) {
        this.removeCurrentPlayer(this.players[playerIndex]);
        this.players[playerIndex].playerType = EPlayerCharacterType.current;
        this.players[playerIndex].playerTypeTitle = 'You';
      } else {
        this.players[playerIndex].playerType = playerType.type;
        this.players[playerIndex].playerTypeTitle = playerType.title;
      }
    }
  }

  switchPlayerCharacter(playerIndex, character) {

  }

  startSinglePlayerGame() {
    const newPlayers = [];
    for (let i = 1; i <= this.mapSize; i++) {
      if (this.players['player' + i].playerType) {
        newPlayers.push({
          name: 'Unknown player',
          playerType: this.players['player' + i].playerType,
          characterName: this.players['player' + i].characterTitle,
          characterModel: this.players['player' + i].character
        });
      }
    }
    gameMemoryStorage.enterGameMode();
    gameMemoryStorage.buildNewGame(this.mapSize, newPlayers, this.currentTheme.name);
    this.router.navigateByUrl('/game');
  }
}
