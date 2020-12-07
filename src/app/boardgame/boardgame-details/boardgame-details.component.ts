import { Component, DoCheck, OnInit } from '@angular/core';
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

  public id: Array<string>;
  public isOwner: boolean;
  public boardGameId: string;

  boardGamePreview: IBoardGame = {
    objectId: null,
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
    ownerId: null
  };
  
  constructor(private route : ActivatedRoute, private boardGamesServcice: BoardGamesService) { }


  ngOnInit() {
    this.boardGameId = this.route.snapshot.params['id'];

    const currentBoardGame = this.boardGamesServcice.gameDetails(this.boardGameId);
    currentBoardGame.then( data => {
      this.boardGamePreview.objectId = data.objectId,
      this.boardGamePreview.Title = data.Title,
      this.boardGamePreview.Publisher = data.Publisher,
      this.boardGamePreview.Designer = data.Designer,
      this.boardGamePreview.MinPlayers = data.MinPlayers,
      this.boardGamePreview.MaxPlayers = data.MaxPlayers,
      this.boardGamePreview.MinPlayingTime = data.MinPlayingTime,
      this.boardGamePreview.MaxPlayingTime = data.MaxPlayingTime,
      this.boardGamePreview.Image = data.Image,
      this.boardGamePreview.VideoUrl = data.VideoUrl,
      this.boardGamePreview.Rating = data.Rating,
      this.boardGamePreview.ownerId = data.ownerId,
      this.isOwner = this.validateOwner()
    });



  }

  validateOwner(){
    return this.boardGamePreview.ownerId === localStorage.getItem('userId') ? true : false;
  }

  savePlayer(event){
    console.log(event);
  }

  onStateChange(event){
    console.log(event);
  }
}
