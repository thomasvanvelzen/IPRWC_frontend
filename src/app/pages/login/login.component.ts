import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/typings/user-credentials.type';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../../typings/access-token.type';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwt: JwtService
  ) {}

  public userCredentials: UserCredentials = { username: null, password: null };

  public login() {
    this.http
      .post<AccessToken>(
        `${environment.apiURL}/user/login`,
        this.userCredentials
      )
      .subscribe((token) => {
        this.jwt.saveToken(token.accessToken);
        this.router.navigate(['home']);
      });
  }
}
