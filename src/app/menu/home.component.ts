import { Component, OnInit } from '@angular/core';


import { gameMemoryStorage } from '../shared/gameMemoryStorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    gameMemoryStorage.enterMenuMode();

  }

}
