import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boardgame-list',
  templateUrl: './boardgame-list.component.html',
  styleUrls: ['./boardgame-list.component.css']
})
export class BoardgameListComponent implements OnInit {
  boardGames: Array<any> = [{
    "Id": 1,
    "Title": "Brass: Birmingham",
    "Publisher": "Roxley",
    "Designer": "Martin Wallace",
    "MinPlayers": 2,
    "MaxPlayers": 4,
    "MinPlayingTime": 60,
    "MaxPlayingTime": 120,
    "Rating": 10
  },{
    "Id": 2,
    "Title": "Carcassonne",
    "Publisher": "Hans im Glück",
    "Designer": "Klaus-Jürgen Wrede",
    "MinPlayers": 2,
    "MaxPlayers": 5,
    "MinPlayingTime": 30,
    "MaxPlayingTime": 45,
    "Rating": 9.9
  },{
    "Id": 3,
    "Title": "Everdell",
    "Publisher": "Starling Games",
    "Designer": "James A. Wilson",
    "MinPlayers": 1,
    "MaxPlayers": 4,
    "MinPlayingTime": 40,
    "MaxPlayingTime": 80,
    "Rating": 9.5
  },{
    "Id": 4,
    "Title": "7 Wonders",
    "Publisher": "Repos Production",
    "Designer": "Antoine Bauza",
    "MinPlayers": 2,
    "MaxPlayers": 7,
    "MinPlayingTime": 30,
    "MaxPlayingTime": 60,
    "Rating": 8.5
  },{
    "Id": 5,
    "Title": "A Game of Thrones: The Board Game",
    "Publisher": "Fantasy Flight Games",
    "Designer": "Christian T. Petersen",
    "MinPlayers": 3,
    "MaxPlayers": 6,
    "MinPlayingTime": 120,
    "MaxPlayingTime": 240,
    "Rating": 9
  },{
    "Id": 6,
    "Title": "Battalia: The Creation",
    "Publisher": "Fantasmagoria",
    "Designer": "Alexandar Guerov",
    "MinPlayers": 2,
    "MaxPlayers": 4,
    "MinPlayingTime": 60,
    "MaxPlayingTime": 180,
    "Rating": 9
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
