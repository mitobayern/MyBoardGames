import { BoardGame } from 'src/app/models/boardGame';
import { IBoardGame } from '../../models/IBoardGame.interface';

import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertifyService } from 'src/app/services/alertify.service';
import { BoardGamesService } from 'src/app/services/boardGames.service';

@Component({
  selector: 'app-add-boardgame',
  templateUrl: './add-boardgame.component.html',
  styleUrls: ['./add-boardgame.component.css'],
})

export class AddBoardgameComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  boardGamePreview: IBoardGame = {
    objectId: null,
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
    VideoUrl: null,
    ownerId: null,
  };

  addBoardGameForm: FormGroup;
  players: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  minutes: Array<number> = [30, 45, 60, 90, 120, 180, 240, 360, 480];
  nextClicked: boolean;
  boardGame = new BoardGame();
  fileToUpload: File = null;
  disableSubmit: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private boardgameService: BoardGamesService) {}

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
      }),
      VideoTutorial: this.formBuilder.group({
        VideoUrl: [null , Validators.required],
      }),
      GamePhotos: this.formBuilder.group({
        Image: [null],
      }),
    })
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.allTabsValid()) {
      this.disableSubmit = true;
      this.mapBoardGame();
      this.boardgameService.createBoadGame(this.boardGame, this.fileToUpload).then(() => {
        this.alertify.success('Congrats, your BoardGame was successfully created');
        this.router.navigate(['/']);
      });
    } else {
      this.nextClicked = true;
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if(isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
      this.nextClicked = false;
    }
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.GameDetails.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.VideoTutorial.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.GamePhotos.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  mapBoardGame(): void {
    this.boardGame.Title = this.Title.value;
    this.boardGame.Designer = this.Designer.value;
    this.boardGame.Publisher = this.Publisher.value;
    this.boardGame.MinPlayers = this.MinPlayers.value;
    this.boardGame.MaxPlayers = this.MaxPlayers.value;
    this.boardGame.MinPlayingTime = this.MinPlayingTime.value;
    this.boardGame.MaxPlayingTime = this.MaxPlayingTime.value;
    this.boardGame.VideoUrl = this.genereteEmbededVideoUrl(this.VideoUrl.value);
    this.boardGame.Image = this.Image.value;
  }

  genereteEmbededVideoUrl(videoUrl: string){
    const regex = /(?<=watch\?v=)[A-Za-z0-9-]+(?=&)/;
    return videoUrl.match(regex)[0];;
  }

  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.onload = () => {
        this.boardGamePreview.Image = reader.result.toString();
      };
      reader.readAsDataURL(files.item(0));
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
    return this.addBoardGameForm.controls.GamePhotos as FormGroup;
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

  get Image(){
    return this.GamePhotos.controls.Image as FormControl;
  }
}
