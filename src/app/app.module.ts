import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BoardgameCardComponent } from './boardgame/boardgame-card/boardgame-card.component';
import { BoardgameListComponent } from './boardgame/boardgame-list/boardgame-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BoardGamesService } from './services/boardGames.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardgameCardComponent,
    BoardgameListComponent,
      NavBarComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BoardGamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
