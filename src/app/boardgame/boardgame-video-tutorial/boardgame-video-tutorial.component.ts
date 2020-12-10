import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBoardGame } from 'src/app/models/IBoardGame.interface';
import { BoardGamesService } from 'src/app/services/boardGames.service';

@Component({
  selector: 'app-boardgame-video-tutorial',
  templateUrl: './boardgame-video-tutorial.component.html',
  styleUrls: ['./boardgame-video-tutorial.component.css']
})
export class BoardgameVideoTutorialComponent implements OnInit {
  public boardGameId: string;
  public videoUrl: string;
  public gameTitle: string;

  constructor(
    private route: ActivatedRoute,
    private boardGamesService: BoardGamesService) { }

  ngOnInit() {
    this.boardGameId = this.route.snapshot.params['id'];

    this.boardGamesService.gameDetails(this.boardGameId)
      .then(data => {
        this.videoUrl = data.VideoUrl,
        this.gameTitle = data.Title
      }
    );
  }
}
