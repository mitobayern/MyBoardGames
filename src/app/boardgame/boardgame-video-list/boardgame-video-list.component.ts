import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boardgame-video-list',
  templateUrl: './boardgame-video-list.component.html',
  styleUrls: ['./boardgame-video-list.component.css']
})
export class BoardgameVideoListComponent implements OnInit {

  videos: Array<string> = [
    'wZjxCDgLkr4',
    'LqVythdYlaQ',
    'jICk9vjQ3Jk',
    'fEwDx8YJndU',
    'OonzeFYrt_o',
    'lrOK75_cXnU'];

  constructor() { }

  ngOnInit() {
  }

}
