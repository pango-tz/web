import {Injectable} from '@angular/core';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/'
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {

  readonly jwtHelper: JwtHelper = new JwtHelper();

  constructor(public loginService: LoginService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkAuthorization(url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkAuthorization(url);
  }

  checkAuthorization(url: string): boolean {
    const token = localStorage.getItem('user-token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.loginService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
