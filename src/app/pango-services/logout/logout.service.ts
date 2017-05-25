import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../base.service';
import { LoginResponse } from '../../models/login-response';
import { LoginRequest } from '../../models/login-request';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import { Response, RequestMethod, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  constructor(public router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
