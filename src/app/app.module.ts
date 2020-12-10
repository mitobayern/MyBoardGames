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
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import Backendless from 'backendless';

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
import { BoardgameVideoListComponent } from './boardgame/boardgame-video-list/boardgame-video-list.component';
import { BoardgamePersonalLibraryComponent } from './boardgame/boardgame-personal-library/boardgame-personal-library.component';
import { EditBoardgameComponent } from './boardgame/edit-boardgame/edit-boardgame.component';
import { BoardgameVideoTutorialComponent } from './boardgame/boardgame-video-tutorial/boardgame-video-tutorial.component';
import { ErrorPageComponent } from './Error-page/error-page/error-page.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '**', component: ErrorPageComponent },
  { path: '', pathMatch: 'full', component: BoardgamePersonalLibraryComponent },
  { path: 'user/login', canActivate:[AuthGuard], component: UserLoginComponent, data: { isLogged: false} },
  { path: 'ranking', canActivate:[AuthGuard], component: BoardgameListComponent, data: { isLogged: true} },
  { path: 'add-boardgame', canActivate:[AuthGuard], component: AddBoardgameComponent, data: { isLogged: true} },
  { path: 'user/register', canActivate:[AuthGuard], component: UserRegisterComponent, data: { isLogged: false} },
  { path: 'video-tutorials', canActivate:[AuthGuard], component: BoardgameVideoListComponent, data: { isLogged: true} },
  { path: 'marketplace', canActivate:[AuthGuard], component: BoardgameSalesListComponent, data: { isLogged: true} },
  { path: 'boardgame-details/:id', canActivate:[AuthGuard], component: BoardgameDetailsComponent, data: { isLogged: true} },
  { path: 'edit-boardgame/:id', canActivate:[AuthGuard], component: EditBoardgameComponent, data: { isLogged: true} },
  { path: 'video-tutorials/:id', canActivate:[AuthGuard], component: BoardgameVideoTutorialComponent, data: { isLogged: true} },
];

Backendless.initApp("5BDFCD08-36D1-D8FE-FF9E-B312ECB3DC00","FE43AA78-FFB9-45F2-B43A-298ECFA60BA9");

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ErrorPageComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AddBoardgameComponent,
    BoardgameCardComponent,
    BoardgameListComponent,
    EditBoardgameComponent,
    BoardgameDetailsComponent,
    BoardgameSalesListComponent,
    BoardgameVideoListComponent,
    BoardgameVideoTutorialComponent,
    BoardgamePersonalLibraryComponent,
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
    NgxYoutubePlayerModule.forRoot(),
  ],
  providers: [
    UserService,
    AlertifyService,
    BoardGamesService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
