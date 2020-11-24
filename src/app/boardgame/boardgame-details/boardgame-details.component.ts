import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boardgame-details',
  templateUrl: './boardgame-details.component.html',
  styleUrls: ['./boardgame-details.component.css']
})
export class BoardgameDetailsComponent implements OnInit {

  public BoardgameId : number;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.BoardgameId = this.route.snapshot.params['id'];
  }

}
