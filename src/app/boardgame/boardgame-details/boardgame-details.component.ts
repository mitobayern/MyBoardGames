import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardGame } from 'src/app/models/boardGame';
import { IBoardGame } from 'src/app/models/IBoardGame.interface';
import { BoardGamesService } from 'src/app/services/boardGames.service';


@Component({
  selector: 'app-boardgame-details',
  templateUrl: './boardgame-details.component.html',
  styleUrls: ['./boardgame-details.component.css']
})
export class BoardgameDetailsComponent implements OnInit {
  [x: string]: any;
  public id: 'string';


  public boardGameId : string;
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
    VideoUrl: null,
  };
  constructor(private route : ActivatedRoute, private boardGamesServcice: BoardGamesService) { }

  ngOnInit() {
    this.boardGameId = this.route.snapshot.params['id'];
    
    const currentBoardGame = this.boardGamesServcice.gameDetails(this.boardGameId);
    currentBoardGame.then( data => {
    this.boardGamePreview.Title = data.Title,
    this.boardGamePreview.VideoUrl = data.VideoUrl

    console.log(this.boardGamePreview.VideoUrl);
  }
  );


  }





}
