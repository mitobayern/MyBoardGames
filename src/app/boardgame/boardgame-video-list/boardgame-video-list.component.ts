import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from 'src/app/services/boardGames.service';

@Component({
  selector: 'app-boardgame-video-list',
  templateUrl: './boardgame-video-list.component.html',
  styleUrls: ['./boardgame-video-list.component.css']
})
export class BoardgameVideoListComponent implements OnInit {

  videos: Array<string> = [];



  constructor(private boardGamesService: BoardGamesService) { }

  ngOnInit() {
    this.boardGamesService.getAllVideoTutorials().subscribe(
      (data) => {
        this.videos = data;
      },
      (error) => {
        console.log('httperror: ');
        console.log(error);
      }
    );
    console.log(this.videos);
  }

}
