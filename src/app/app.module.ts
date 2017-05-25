import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

import {BASE_API_HREF} from './tokens';

import {PangoServicesModule} from './pango-services/pango-services.module';
import {RentalsModule} from './rentals/rentals.module';
import {ManageModule} from './manage/manage.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AuthGuardService } from './pango-services';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PangoFormComponent } from './pango-form/pango-form.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'rentals',
    pathMatch: 'full'
  },
  {
    path: 'rentals',
    loadChildren: 'app/rentals/rentals.module#RentalsModule',
    pathMatch: 'full'
  },
  {
    path: 'manage',
    loadChildren: 'app/manage/manage.module#ManageModule',
    pathMatch: 'full',
    canLoad: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ErrorDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    RentalsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    PangoServicesModule,
    ManageModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
