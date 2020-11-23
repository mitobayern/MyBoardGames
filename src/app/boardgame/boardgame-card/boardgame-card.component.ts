import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-boardgame-card',
  templateUrl: './boardgame-card.component.html',
  styleUrls: ['./boardgame-card.component.css']
})
export class BoardgameCardComponent implements OnInit {
  @Input() boardGame : any
  boardGame: any = {
    "Id": 1,
    "Title": "Brass: Birmingham",
    "Publisher": "Roxley",
    "Designer": "Martin Wallace",
    "MinPlayers": 2,
    "MaxPlayers": 4,
    "MinPlayingTime": 60,
    "MaxPlayingTime": 120,
    "Rating": 10
  }
  constructor() {
  }

  ngOnInit() {
  }

}
