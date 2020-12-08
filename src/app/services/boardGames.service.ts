import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBoardGame } from '../models/IBoardGame.interface';
import { Observable, from } from 'rxjs';
import { BoardGame } from '../models/boardGame';
import { Rating } from '../models/rating';

import { createBoardGameAsync, getBoardGameByIdAsync, uploadFileAsync, getAllBoardGamesAsync, updateBoardGameAsync, rateBoardGameAsync, getAllRatingsAsync } from '../services/webApi.js'


@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  boardGamesArray: IBoardGame;

  constructor(private httpp: HttpClient) {}

  getAllBoardGames():Observable<IBoardGame[]>  {
    return from(getAllBoardGamesAsync()).pipe(
      map((data:any) => {
        const boardGamesArray: Array<IBoardGame> = [];

        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            boardGamesArray.push(data[id]);
          }
        }
        console.log(boardGamesArray);

        return boardGamesArray;
      })
    );
  }

  getAllBoardGamesOnSale(): Observable<IBoardGame[]> {
    return from(getAllBoardGamesAsync()).pipe(
      map((data:any) => {
        const boardGamesArray: Array<IBoardGame> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].onSale === true ) {
            boardGamesArray.push(data[id]);
          }
        }
        return boardGamesArray;
      })
    );
  }

  getAllBoardGamesByOwner(): Observable<IBoardGame[]> {
    return from(getAllBoardGamesAsync()).pipe(
      map((data:any) => {
        const boardGamesArray: Array<IBoardGame> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].ownerId === localStorage.getItem('userId')) {
            boardGamesArray.push(data[id]);
          }
        }
        return boardGamesArray;
      })
    );
  }

  getGameRatingByOwnerId(gameId): Observable<Rating> {
    return from(getAllRatingsAsync()).pipe(
      map((data:any) => {
        var rating = new Rating();
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].ownerId === localStorage.getItem('userId') && data[id].GameId === gameId) {
            rating = data[id];
          }
        }
        console.log(rating);

        return rating;
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

  async rateBoadGame(rating: Rating) {
    try {
      const newRating = {
        GameId: rating.GameId,
        Rating: rating.Rating,
        ownerId: rating.ownerId,
      }

      rateBoardGameAsync(newRating);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }


  async editBoadGame(boardGame: BoardGame, fileToUpload?: File) {
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
        Image: boardGame.Image
      }

      if(fileToUpload) {
        uploadFileAsync(fileToUpload).then(
          response => {
            newBoardGame.Image = response.fileURL;
            const result = updateBoardGameAsync(boardGame.objectId, newBoardGame);
          }
        );
      } else {
        console.log(newBoardGame);

        const result = updateBoardGameAsync(boardGame.objectId, newBoardGame);
      }

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async gameDetails(id: string): Promise<BoardGame> {
    return await getBoardGameByIdAsync(id);
  }

  getAllVideoTutorials():Observable<string[]>  {
    return from(getAllBoardGamesAsync()).pipe(
      map((data:any) => {
        const videoUrls: Array<string> = [];

        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            videoUrls.push(data[id].VideoUrl)
          }
        }
        console.log(videoUrls);

        return videoUrls;
      })
    );
  }



  validateResult(result) {
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
  }
}


