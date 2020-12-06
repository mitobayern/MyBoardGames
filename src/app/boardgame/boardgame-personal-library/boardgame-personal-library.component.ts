import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from 'src/app/services/boardGames.service';
import { IBoardGame } from '../../models/IBoardGame.interface';

@Component({
  selector: 'app-boardgame-personal-library',
  templateUrl: './boardgame-personal-library.component.html',
  styleUrls: ['./boardgame-personal-library.component.css']
})
export class BoardgamePersonalLibraryComponent implements OnInit {

  boardGames: Array<IBoardGame>;

  constructor(private boardGamesService: BoardGamesService) {}

  ngOnInit(): void {
    this.boardGamesService.getAllBoardGamesByOwner().subscribe(
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
