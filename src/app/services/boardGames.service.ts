import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBoardGame } from '../models/IBoardGame.interface';
import { Observable, from } from 'rxjs';
import { BoardGame } from '../models/boardGame';
import { Rating } from '../models/rating';

import { createBoardGameAsync, getBoardGameByIdAsync, uploadFileAsync, getAllBoardGamesAsync, updateBoardGameAsync, rateBoardGameAsync, getAllRatingsAsync, updateRatingAsync } from '../services/webApi.js'


@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  boardGamesArray: IBoardGame;

  constructor() {}

  getAllBoardGames():Observable<IBoardGame[]>  {
    return from(getAllBoardGamesAsync()).pipe(
      map((data:any) => {
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
    return from(getAllBoardGamesAsync()).pipe(
      map((data:any) => {
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
        let rating = new Rating();
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].ownerId === localStorage.getItem('userId') && data[id].GameId === gameId) {
            rating = data[id];
          }
        }
        return rating;
      })
    );
  }

  getAverageGameRatingByGameId(gameId): Observable<number> {
    return from(getAllRatingsAsync()).pipe(
      map((data:any) => {
        let rating: number = 0;
        let counter: number = 0;
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].GameId === gameId) {
            rating += +(data[id].Rating);
            counter++;
          }
        }
        rating = rating/counter;

        return rating;
      })
    );
  }

  createBoadGame(boardGame: BoardGame, fileToUpload: File) {
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

      return uploadFileAsync(fileToUpload).then(
        response => {
          newBoardGame.Image = response.fileURL;
          return createBoardGameAsync(newBoardGame);
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

  async updateRating(rating: Rating) {
    try {
      const newRating = {
        GameId: rating.GameId,
        Rating: rating.Rating,
        ownerId: rating.ownerId,
        objectId: rating.objectId
      }

      return updateRatingAsync(newRating.objectId, newRating);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  editBoadGame(boardGame: BoardGame, fileToUpload?: File) {
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
        Image: boardGame.Image,
        Rating: boardGame.Rating,
        OnSale: boardGame.OnSale
      }

      if(fileToUpload) {
        return uploadFileAsync(fileToUpload).then(
          response => {
            newBoardGame.Image = response.fileURL;
            return updateBoardGameAsync(boardGame.objectId, newBoardGame);
          }
        );
      } else {
        return updateBoardGameAsync(boardGame.objectId, newBoardGame);
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


