import { Component, OnInit } from '@angular/core';
import { LoginService, LogoutService } from './pango-services';
import { RequestMethod } from '@angular/http';
import { LoginResponse } from './models';
import { JwtHelper } from 'angular2-jwt';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  readonly jwtHelper: JwtHelper = new JwtHelper();
  readonly appLinks: Array<any> = [
    {
      path: 'rentals',
      label: 'Rentals',
      icon: 'home'
    },
    {
      path: 'manage-properties',
      label: 'Manage Properties',
      icon: 'view_list'
    }
  ];

  constructor(public login: LoginService, public logoutService: LogoutService) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  logout() {
    this.logoutService.logout();
  }

  isLoggedIn() {
    const token = localStorage.getItem('user-token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
