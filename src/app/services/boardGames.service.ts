import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBoardGame } from '../models/IBoardGame.interface';
import { Observable } from 'rxjs';
import { BoardGame } from '../models/boardGame';
import { createBoardGameAsync, getBoardGameByIdAsync, uploadFileAsync } from '../services/webApi.js'


@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  boardGamesArray: IBoardGame;

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

  async createBoadGame(boardGame: BoardGame, fileToUpload: File) {
    try {
      const newBoardGame = {
        Title: boardGame.Title,
        Publisher: boardGame.Publisher,
        Designer: boardGame.Designer,
        MinPlayers: boardGame.MinPlayers,
        MaxPlayers: boardGame.MaxPlayers,
        MinPlayingTime: boardGame.MinPlayingTime,
        MaxPlayingTime: boardGame.MaxPlayingTime,
        VideoUrl: boardGame.VideoUrl,
        creator: localStorage.userId,
        Image: null
      }

      uploadFileAsync(fileToUpload).then(
        response => {
          newBoardGame.Image = response.fileURL;
          const result = createBoardGameAsync(newBoardGame);
        }

      );


    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

   async gameDetails(id: string): Promise<BoardGame> {
    const result = await getBoardGameByIdAsync(id);

    return result;

    // const context = Object.assign({movie}, this.app.userData);

  //   if (movie.creator === this.app.userData.email) {
  //     this.partial('./templates/movie/own.hbs', context);
  // } else {
  //     if (movie.peopleLiked.includes(this.app.userData.email)) {
  //         this.partial('./templates/movie/liked.hbs', context);
  //     } else {
  //         this.partial('./templates/movie/details.hbs', context);
  //     }
  // }
}






  validateResult(result) {
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
  }
}


