import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IBoardGame } from 'src/app/models/IBoardGame.interface';
import { BoardGamesService } from 'src/app/services/boardGames.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-boardgame-details',
  templateUrl: './boardgame-details.component.html',
  styleUrls: ['./boardgame-details.component.css']
})

export class BoardgameDetailsComponent implements OnInit {

  public isOwner: boolean;
  public id: Array<string>;
  public boardGameId: string;
  public rating = new Rating();
  public currentRating: Rating;
  public addRatingForm: FormGroup;
  public isRateClicked: boolean = false;
  public ratingNumbers: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public isRated: boolean;
  public averageRating: number;
  public disableSubmit: boolean = false;


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
    ownerId: null
  };

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private boardGamesService: BoardGamesService) { }

  ngOnInit() {
    this.CreateAddBoardGameForm();
    this.boardGameId = this.route.snapshot.params['id'];

    this.boardGamesService.getGameRatingByOwnerId(this.boardGameId).subscribe(
      (data) => {
        this.currentRating = data;
        this.isRated = this.validateUserRating(this.currentRating);
      },
      (error) => {
        console.log('httperror: ');
        console.log(error);
      }
    );

    this.boardGamesService.getAverageGameRatingByGameId(this.boardGameId).subscribe(
      (data) => {
        this.averageRating = data;
      },
      (error) => {
        console.log('httperror: ');
        console.log(error);
      }
    );

    this.boardGamesService.gameDetails(this.boardGameId)
      .then(data => {
        this.boardGamePreview.objectId = data.objectId,
        this.boardGamePreview.Title = data.Title,
        this.boardGamePreview.Publisher = data.Publisher,
        this.boardGamePreview.Designer = data.Designer,
        this.boardGamePreview.MinPlayers = data.MinPlayers,
        this.boardGamePreview.MaxPlayers = data.MaxPlayers,
        this.boardGamePreview.MinPlayingTime = data.MinPlayingTime,
        this.boardGamePreview.MaxPlayingTime = data.MaxPlayingTime,
        this.boardGamePreview.Image = data.Image,
        this.boardGamePreview.VideoUrl = data.VideoUrl,
        this.boardGamePreview.Rating = data.Rating,
        this.boardGamePreview.ownerId = data.ownerId,
        this.boardGamePreview.OnSale = data.OnSale,
        this.isOwner = this.validateOwner()
      }
    );

  }

  validateOwner(){
    return this.boardGamePreview.ownerId === localStorage.getItem('userId') ? true : false;
  }

  savePlayer(event){
    console.log(event);
  }

  onStateChange(event){
    console.log(event);
  }

  onRateClicked(){
    this.isRateClicked = !this.isRateClicked;
  }

  onSubmit(){
    this.disableSubmit = true;
    this.mapRating();
    if(this.isRated){
      this.rating.objectId = this.currentRating.objectId
      this.boardGamesService.updateRating(this.rating).then(()=>{
        this.alertify.success(`You have succesfuly updated your rating to ${this.rating.Rating}`);
        this.boardGamesService.getAverageGameRatingByGameId(this.boardGameId).subscribe(
          (data) => {
            this.boardGamePreview.Rating = data;
            this.boardGamesService.editBoadGame(this.boardGamePreview).then(() => {
              this.router.navigate(['ranking']);
            });
          },
          (error) => {
            console.log('httperror: ');
            console.log(error);
          }
        );
      });


    } else {
      this.boardGamesService.rateBoadGame(this.rating).then(() => {
        this.boardGamesService.getAverageGameRatingByGameId(this.boardGameId).subscribe(
          (data) => {
            this.boardGamePreview.Rating = data;
            this.boardGamesService.editBoadGame(this.boardGamePreview).then(() => {
              this.router.navigate(['ranking']);
            });
          },
          (error) => {
            console.log('httperror: ');
            console.log(error);
          }
        );
        this.alertify.success(`You have succesfuly rated this game with ${this.rating.Rating}`);
        this.router.navigate(['ranking']);
      });
    }
  }

  onSaleClicked(){
    if(!this.boardGamePreview.OnSale) {
      this.boardGamePreview.OnSale = true;
      this.boardGamesService.editBoadGame(this.boardGamePreview).then(()=>{
        this.alertify.success(`You have succesfuly listed your game for sale`);
        this.router.navigate(['/marketplace']);
      });
    } else {
      this.boardGamePreview.OnSale = false;
      this.boardGamesService.editBoadGame(this.boardGamePreview).then(()=>{
        this.alertify.success(`You have succesfuly removed your game from market`);
        this.router.navigate(['/']);
      });
    }
  }

  CreateAddBoardGameForm() {
    this.addRatingForm = this.formBuilder.group({Rating: [null]})
  }

  get Rating() {
    return this.addRatingForm.controls.Rating as FormControl;
  }

  mapRating(): void {
    this.rating.GameId = this.boardGameId;
    this.rating.ownerId = localStorage.getItem('userId');
    this.rating.Rating = this.Rating.value;
  }

  validateUserRating(currentRating){
    if(currentRating.hasOwnProperty('Rating')){
      this.isRated = true;
      return this.isRated;
    } else {
      this.isRated = false;
      return this.isRated;
    }
  }
}
