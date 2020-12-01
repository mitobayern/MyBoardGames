import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBoardGame } from '../models/IBoardGame.interface';
import { Observable } from 'rxjs';
import { BoardGame } from '../models/boardGame';

@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  constructor(private httpp: HttpClient) {}

  getAllBoardGames(): Observable<IBoardGame[]> {
    return this.httpp.get('/data/boardGames.json').pipe(
      map((data) => {
        const boardGamesArray: Array<IBoardGame> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            boardGamesArray.push(data[id]);
          }
        }
        return boardGamesArray;
      })
    );
  }

  getAllBoardGamesOnSale(): Observable<IBoardGame[]> {
    return this.httpp.get('/data/boardGames.json').pipe(
      map((data) => {
        const boardGamesArray: Array<IBoardGame> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].OnSale === true ) {
            boardGamesArray.push(data[id]);
          }
        }
        return boardGamesArray;
      })
    );
  }

  addBoardGame(boardGame: BoardGame){
    localStorage.setItem('newBoardGame', JSON.stringify(boardGame))
  }
}
