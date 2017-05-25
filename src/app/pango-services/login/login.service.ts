import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../base.service';
import { LoginResponse } from '../../models/login-response';
import { LoginRequest } from '../../models/login-request';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import { Response, RequestMethod, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { BASE_API_HREF } from '../../tokens';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { LoginRefreshService } from './login-refresh.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService extends BaseService<LoginRequest, LoginResponse> {

  redirectUrl = '/';

  refreshIntervalSubscription: Subscription;

  readonly jwtHelper: JwtHelper = new JwtHelper();

  constructor( @Inject(BASE_API_HREF) apiUrl: string, http: AuthHttp, public loginRefreshService: LoginRefreshService,
   private router: Router) {
    super(apiUrl, http);
  }

  getEndpointUrl(): string {
    return '/authenticate';
  }

  public checkToken(): boolean {

    const token = localStorage.getItem('user-token');

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.refreshToken();
      } else {
        this.startInterval(3600000);
      }

    }

    return false;



  }

  refreshToken() {

    this.loginRefreshService.doRequest(RequestMethod.Get)
      .subscribe((response) => {
        console.log('refreshed user', response);
        return this.handleLoginResponse (response);
      }, this.handleRefreshTokenError);
  }

  startInterval(expiryTime: number) {
    if (this.refreshIntervalSubscription === null || this.refreshIntervalSubscription === undefined) {
      this.refreshIntervalSubscription = Observable.interval(expiryTime).subscribe(() => {
        this.refreshToken();
      });
    }



  }

  handleRefreshTokenError(error: any) {
    return error;
  }

  public handleLoginResponse(loginResponse: LoginResponse) {
    localStorage.setItem('user-token', loginResponse.userToken);
    localStorage.setItem('user-reference-id', loginResponse.userReferenceId);
    this.checkToken();
  }

}
