import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserLoginComponent } from './user/user-login/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { AddBoardgameComponent } from './boardgame/add-boardgame/add-boardgame.component';
import { BoardgameCardComponent } from './boardgame/boardgame-card/boardgame-card.component';
import { BoardgameListComponent } from './boardgame/boardgame-list/boardgame-list.component';
import { BoardgameDetailsComponent } from './boardgame/boardgame-details/boardgame-details.component';
import { BoardgameSalesListComponent } from './boardgame/boardgame-sales-list/boardgame-sales-list.component';

import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { BoardGamesService } from './services/boardGames.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: BoardgameListComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'ranking', component: BoardgameListComponent },
  { path: 'add-boardgame', component: AddBoardgameComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'video-tutorials', component: AddBoardgameComponent },
  { path: 'marketplace', component: BoardgameSalesListComponent },
  { path: 'boardgame-details/:id', component: BoardgameDetailsComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AddBoardgameComponent,
    BoardgameCardComponent,
    BoardgameListComponent,
    BoardgameDetailsComponent,
    BoardgameSalesListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [
    UserService,
    AlertifyService,
    BoardGamesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
