import {Component, Input, OnInit} from '@angular/core';
import { IBoardGame } from '../IBoardGame.interface';

@Component({
  selector: 'app-boardgame-card',
  templateUrl: './boardgame-card.component.html',
  styleUrls: ['./boardgame-card.component.css']
})
export class BoardgameCardComponent implements OnInit {
  @Input() boardGame : IBoardGame

  constructor() {
  }

  ngOnInit() {
  }

}
