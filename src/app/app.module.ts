import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddBoardgameComponent } from './boardgame/add-boardgame/add-boardgame.component';
import { BoardgameCardComponent } from './boardgame/boardgame-card/boardgame-card.component';
import { BoardgameDetailsComponent } from './boardgame/boardgame-details/boardgame-details.component';
import { BoardgameListComponent } from './boardgame/boardgame-list/boardgame-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { BoardGamesService } from './services/boardGames.service';
import { BoardgameSalesListComponent } from './boardgame/boardgame-sales-list/boardgame-sales-list.component';
import { UserLoginComponent } from './user/user-login/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AuthenticationService } from './services/authentication.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: BoardgameListComponent },
  { path: 'boardgame-details/:id', component: BoardgameDetailsComponent },
  { path: 'ranking', component: BoardgameListComponent },
  { path: 'video-tutorials', component: AddBoardgameComponent },
  { path: 'marketplace', component: BoardgameSalesListComponent },
  { path: 'add-boardgame', component: AddBoardgameComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    AddBoardgameComponent,
    BoardgameCardComponent,
    BoardgameDetailsComponent,
    BoardgameListComponent,
    BoardgameSalesListComponent,
    NavBarComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AlertifyService,
    BoardGamesService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
