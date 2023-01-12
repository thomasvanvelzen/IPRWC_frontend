import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { User } from '../typings/user.type';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private jwt: JwtService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    const token = this.jwt.getToken();

    if (!token) this.router.navigate(['login']);

    const tokenPayload = decode(token as string) as User;
    if (
      !this.auth.isAuthenticated() ||
      (tokenPayload.role !== expectedRole && tokenPayload.role !== 'admin')
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
