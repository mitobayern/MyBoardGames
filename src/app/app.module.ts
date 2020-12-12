import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';


import Backendless from 'backendless';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorPageComponent } from './Error-page/error-page/error-page.component';
import { UserLoginComponent } from './user/user-login/user-login/user-login.component';
import { AddBoardgameComponent } from './boardgame/add-boardgame/add-boardgame.component';
import { BoardgameCardComponent } from './boardgame/boardgame-card/boardgame-card.component';
import { BoardgameListComponent } from './boardgame/boardgame-list/boardgame-list.component';
import { EditBoardgameComponent } from './boardgame/edit-boardgame/edit-boardgame.component';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { BoardgameDetailsComponent } from './boardgame/boardgame-details/boardgame-details.component';
import { BoardgameSalesListComponent } from './boardgame/boardgame-sales-list/boardgame-sales-list.component';
import { BoardgameVideoListComponent } from './boardgame/boardgame-video-list/boardgame-video-list.component';
import { BoardgameVideoTutorialComponent } from './boardgame/boardgame-video-tutorial/boardgame-video-tutorial.component';
import { BoardgamePersonalLibraryComponent } from './boardgame/boardgame-personal-library/boardgame-personal-library.component';

import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AlertifyService } from './services/alertify.service';
import { BoardGamesService } from './services/boardGames.service';

Backendless.initApp(environment.backendless.appId,environment.backendless.JSAPIkey);

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
    AppRoutingModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    NgxUiLoaderModule.forRoot({minTime:2000}),
    NgxUiLoaderRouterModule
  ],
  providers: [
    UserService,
    AlertifyService,
    BoardGamesService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
