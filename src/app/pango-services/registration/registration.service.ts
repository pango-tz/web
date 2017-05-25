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
import { AuthHttp } from 'angular2-jwt';
import { LoginRefreshService } from '../login';
import { Router } from '@angular/router';

@Injectable()
export class LoginService extends BaseService<LoginRequest, LoginResponse> {

  redirectUrl: string;

  refreshIntervalSubscription: Subscription;

  readonly jwtHelper: JwtHelper = new JwtHelper();

  constructor( @Inject(BASE_API_HREF) apiUrl: string, http: AuthHttp, public loginRefreshService: LoginRefreshService,
   private router: Router) {
    super(apiUrl, http);
  }

  getEndpointUrl(): string {
    return '/authenticate';
  }

  checkToken(): boolean {

    if (this.refreshIntervalSubscription === null || this.refreshIntervalSubscription === undefined) {
      const token = localStorage.getItem('user-token');

      if (token) {
        const expiryTime = this.jwtHelper.getTokenExpirationDate(token).getTime();

        const halfExpiryTime = expiryTime / 2;

        const currentTime = new Date().getTime();

        if ((expiryTime - currentTime) <= halfExpiryTime) {
          this.refreshToken();
        } else {
          this.startInterval(halfExpiryTime);
        }

        return true;
      }

      return false;
    }


  }

  refreshToken() {
    this.loginRefreshService.doRequest(RequestMethod.Get)
      .subscribe(this.handleLoginResponse, this.handleRefreshTokenError);
  }

  startInterval(expiryTime: number) {

    this.refreshIntervalSubscription = Observable.interval(expiryTime).subscribe(() => {
      this.refreshToken();
    });


  }

  handleRefreshTokenError(error: any) {
    return error;
  }

  handleLoginResponse(loginResponse: LoginResponse) {
    localStorage.setItem('user-token', loginResponse.userToken);
    localStorage.setItem('user-reference-id', loginResponse.userReferenceId);
    this.checkToken();
  }

  doRequest(method: RequestMethod, body?:
    LoginRequest, options?: RequestOptions,
    ...urlReplacementArgs: Array<any>): Observable<LoginResponse> {

    const response = super.doRequest(method, body, options, urlReplacementArgs);

    response.subscribe(this.handleLoginResponse);

    return response;
  }

}
