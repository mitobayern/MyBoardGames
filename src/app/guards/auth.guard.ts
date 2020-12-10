import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
constructor (private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedFromData = route.data.isLogged;
    if(typeof isLoggedFromData === 'boolean' && isLoggedFromData === localStorage.hasOwnProperty('userId')){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
