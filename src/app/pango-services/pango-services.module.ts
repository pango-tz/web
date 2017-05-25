import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { BASE_API_HREF } from '../tokens';
import { environment } from '../../environments/environment';
import { LoginService, LoginRefreshService } from './login';
import { AuthGuardService } from './guards';
import { LogoutService } from './logout/logout.service';

const ENV = environment.apiUrl;

/**
 * Sets up the Http provider to provide automatic header configuration for all calls
 *
 * @param http - the Http call
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({
          headerName: 'user-token',
          noJwtError: true,
          tokenGetter: (() => localStorage.getItem('user-token')),
          noTokenScheme: true,
          globalHeaders: [{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }]
        }), http, options);
}


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    { provide: BASE_API_HREF, useValue: environment.apiUrl },
    LoginService,
    LoginRefreshService,
    AuthGuardService,
    LogoutService
  ]
})
export class PangoServicesModule {
  constructor(loginService: LoginService) {
    loginService.checkToken();
  }
 }
