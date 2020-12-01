import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IBoardGame } from '../IBoardGame.interface';

@Component({
  selector: 'app-add-boardgame',
  templateUrl: './add-boardgame.component.html',
  styleUrls: ['./add-boardgame.component.css'],
})
export class AddBoardgameComponent implements OnInit {
  // @ViewChild('Form') createBoardgameForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  boardGamePreview: IBoardGame = {
    Id: null,
    Title: '',
    OnSale: false,
    Publisher: null,
    Designer: null,
    MinPlayers: null,
    MaxPlayers: null,
    MinPlayingTime: null,
    MaxPlayingTime: null,
    Rating: null,
    Image: null,
  };

  addBoardGameForm: FormGroup;
  players: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  minutes: Array<number> = [30, 45, 60, 90, 120, 180, 240, 360, 480];
  nextClicked: boolean;



  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.CreateAddBoardGameForm();
  }

  CreateAddBoardGameForm() {
    this.addBoardGameForm = this.formBuilder.group({
      BasicInfo: this.formBuilder.group({
        Title: [null , Validators.required],
        Publisher: [null , Validators.required],
        Designer: [null , Validators.required],
      }),
      GameDetails: this.formBuilder.group({
        MinPlayers: [null , Validators.required],
        MaxPlayers: [null , Validators.required],
        MinPlayingTime: [null , Validators.required],
        MaxPlayingTime: [null , Validators.required],
        Rating: [null , Validators.required],
      }),
      VideoTutorial: this.formBuilder.group({
        VideoUrl: [null , Validators.required],
      }),
      GamePhotos: this.formBuilder.group({
        Image: [null , Validators.required],
      }),
    })
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active = true;
      return;
    }

    if(this.GameDetails.invalid){
      this.formTabs.tabs[1].active = true;
      return;
    }

    if(this.VideoTutorial.invalid){
      this.formTabs.tabs[2].active = true;
      return;
    }

    console.log(this.addBoardGameForm.value);
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if(isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }

  }

  get BasicInfo() {
    return this.addBoardGameForm.controls.BasicInfo as FormGroup;
  }

  get GameDetails(){
    return this.addBoardGameForm.controls.GameDetails as FormGroup;
  }

  get VideoTutorial(){
    return this.addBoardGameForm.controls.VideoTutorial as FormGroup;
  }

  get GamePhotos(){
    return this.addBoardGameForm.controls.VideoTutorial as FormGroup;
  }

  get Title(){
    return this.BasicInfo.controls.Title as FormControl;
  }

  get Publisher(){
    return this.BasicInfo.controls.Publisher as FormControl;
  }

  get Designer(){
    return this.BasicInfo.controls.Designer as FormControl;
  }

  get MinPlayers(){
    return this.GameDetails.controls.MinPlayers as FormControl;
  }

  get MaxPlayers(){
    return this.GameDetails.controls.MaxPlayers as FormControl;
  }

  get MinPlayingTime(){
    return this.GameDetails.controls.MinPlayingTime as FormControl;
  }

  get MaxPlayingTime(){
    return this.GameDetails.controls.MaxPlayingTime as FormControl;
  }

  get Rating(){
    return this.GameDetails.controls.Rating as FormControl;
  }

  get VideoUrl(){
    return this.VideoTutorial.controls.VideoUrl as FormControl;
  }
}
