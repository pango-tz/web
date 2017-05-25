import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PangoFormComponent } from '../pango-form/pango-form.component';
import { LoginService } from '../pango-services';
import { RequestMethod } from '@angular/http';
import {LoginRequest, LoginResponse, ErrorResponse} from '../models';
import { Router } from '@angular/router';
import {MdDialog} from '@angular/material';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import {ErrorDialog} from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends PangoFormComponent implements OnInit  {

  loginForm: FormGroup;
  loggingIn = false;
  formErrors = {
    userName: '',
    password: ''
  };

  submitError: string;
  isError = false;

  validationMessages = {
    'userName': {
      'required': 'Email cannot be blank.',
      'email': 'Must be a valid email'
    },
    'password': {
      'required': 'Password cannot be blank.',
      'minlength': 'Password must be at least 6 characters long.'
    }
  };

  constructor( private fb: FormBuilder, private loginService: LoginService, private router: Router, public dialog: MdDialog ) {  super(); }

  handleError(err: ErrorResponse | Response) {
    this.loggingIn = false;
    let errorMessage;

    if (err.status >= 500) {
      errorMessage = 'Looks like something went wrong. Please try again.';
    } else {
      errorMessage = 'Wrong username or password.';
    }

    const errorDialogData: ErrorDialog = {
      title: 'Login Error',
      errorMessage: errorMessage
    };

    this.submitError = errorMessage;

  }

  handleSuccess(loginResponse: LoginResponse) {
    this.loggingIn = false;
    this.loginService.handleLoginResponse(loginResponse);
    const redirectUrl = this.loginService.redirectUrl;
    this.loginService.redirectUrl = '/';
    this.router.navigate([redirectUrl]);
  }

  onSubmit() {
    this.submitError = null;

    const request: LoginRequest = <LoginRequest> this.loginForm.value;
    this.loggingIn = true;
    this.loginService.doRequest(RequestMethod.Post, request)
      .subscribe( (success) => this.handleSuccess(success), (err) => this.handleError(err));
  }

  buildForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.email, Validators.required] ],
      password: ['', [Validators.minLength(6), Validators.required]]
    });

    this.loginForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data, this.loginForm, this.formErrors, this.validationMessages);
      });
  }
  ngOnInit() {
    super.ngOnInit();
  }



}
