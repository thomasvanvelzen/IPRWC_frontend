import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private jwt: JwtService) {}

  public isAuthenticated(): boolean {
    const token = this.jwt.getToken();
    return !this.jwtHelper.isTokenExpired(token as string);
  }
}
