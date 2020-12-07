import { IBoardGame } from './IBoardGame.interface';

export class BoardGame implements IBoardGame {
  objectId: string;
  OnSale: boolean;
  Title: string;
  Publisher: string;
  Designer: string;
  MinPlayers: number;
  MaxPlayers: number;
  MinPlayingTime: number;
  MaxPlayingTime: number;
  Rating: number;
  Image?: string;
  VideoUrl: string;
  ownerId: string;
}
