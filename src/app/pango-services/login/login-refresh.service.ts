import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { LoginResponse } from '../../models/login-response';
@Injectable()
export class LoginRefreshService extends BaseService<null, LoginResponse> {

  getEndpointUrl(): string {
    return '/authenticate/refresh';
  }

}
