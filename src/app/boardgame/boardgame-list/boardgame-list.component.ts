import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from 'src/app/services/boardGames.service';
import { IBoardGame } from '../../models/IBoardGame.interface';

@Component({
  selector: 'app-boardgame-list',
  templateUrl: './boardgame-list.component.html',
  styleUrls: ['./boardgame-list.component.css'],
})
export class BoardgameListComponent implements OnInit {
  boardGames: Array<IBoardGame>;

  constructor(private boardGamesService: BoardGamesService) {}

  ngOnInit(): void {
    this.boardGamesService.getAllBoardGames().subscribe(
      (data) => {
        this.boardGames = data;
      },
      (error) => {
        console.log('httperror: ');
        console.log(error);
      }
    );

  }
}
