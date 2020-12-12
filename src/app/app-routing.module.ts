import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './Error-page/error-page/error-page.component';
import { UserLoginComponent } from './user/user-login/user-login/user-login.component';
import { AddBoardgameComponent } from './boardgame/add-boardgame/add-boardgame.component';
import { BoardgameListComponent } from './boardgame/boardgame-list/boardgame-list.component';
import { EditBoardgameComponent } from './boardgame/edit-boardgame/edit-boardgame.component';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { BoardgameDetailsComponent } from './boardgame/boardgame-details/boardgame-details.component';
import { BoardgameSalesListComponent } from './boardgame/boardgame-sales-list/boardgame-sales-list.component';
import { BoardgameVideoListComponent } from './boardgame/boardgame-video-list/boardgame-video-list.component';
import { BoardgameVideoTutorialComponent } from './boardgame/boardgame-video-tutorial/boardgame-video-tutorial.component';
import { BoardgamePersonalLibraryComponent } from './boardgame/boardgame-personal-library/boardgame-personal-library.component';



export const appRoutes: Routes = [
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
  { path: '**', component: ErrorPageComponent },
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
