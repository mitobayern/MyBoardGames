import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-boardgame',
  templateUrl: './add-boardgame.component.html',
  styleUrls: ['./add-boardgame.component.css']
})
export class AddBoardgameComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
