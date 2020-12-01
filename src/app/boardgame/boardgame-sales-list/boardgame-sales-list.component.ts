import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from 'src/app/services/boardGames.service';
import { IBoardGame } from '../../models/IBoardGame.interface';

@Component({
  selector: 'app-boardgame-sales-list',
  templateUrl: './boardgame-sales-list.component.html',
  styleUrls: ['./boardgame-sales-list.component.css']
})
export class BoardgameSalesListComponent implements OnInit {
  boardGames: Array<IBoardGame>;

  constructor(private boardGamesService: BoardGamesService) { }

  ngOnInit() {
    this.boardGamesService.getAllBoardGamesOnSale().subscribe(
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



