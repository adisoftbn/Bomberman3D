import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentCategory = null;
  categories = [
    'audio',
    'video',
    'controls',
  ];
  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.currentCategory = params['category'];
        if (this.currentCategory !== null && this.categories.indexOf(this.currentCategory) < 0) {
          this.currentCategory = null;
        }
      });

  }
}
