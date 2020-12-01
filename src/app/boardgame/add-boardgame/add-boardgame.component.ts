import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IBoardGame } from '../IBoardGame.interface';

@Component({
  selector: 'app-add-boardgame',
  templateUrl: './add-boardgame.component.html',
  styleUrls: ['./add-boardgame.component.css'],
})
export class AddBoardgameComponent implements OnInit {
  @ViewChild('Form') createBoardgameForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  minutes: Array<number> = [30, 45, 60, 90, 120, 180, 240, 360, 480];
  players: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



  constructor(private router: Router) {}

  ngOnInit() {}

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.createBoardgameForm.value);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  boardGamePreview: IBoardGame = {
    Id: null,
    Title: '',
    OnSale: false,
    Publisher: null,
    Designer: null,
    MinPlayers: null,
    MaxPlayers: null,
    MinPlayingTime: null,
    MaxPlayingTime: null,
    Rating: null,
    Image: null,
  };
}
