import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthUtils } from '../utils/auth-utils';
import { User } from '../model/securedUser.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  urlBasic = 'http://localhost:8082/login';

  isLogin: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private errorPanel: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (AuthUtils.isLogged()) {
      this.router.navigate(['main']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    const user: User = new User(this.loginForm.value);
    const header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post(this.urlBasic, this.loginForm.value, {headers: header, observe: 'response'}).subscribe((result) => {
      let user: User = new User(result.body);
      user.password = this.loginForm.value.password;
      AuthUtils.loggin(user, this.router);
    }, (error) => {
      this.loginError();
    });
  }

  loginError(): void {
    this.isLogin = false;
    this.errorPanel.open('User or password entered is not correct', 'ERROR', {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    });
  }

}
