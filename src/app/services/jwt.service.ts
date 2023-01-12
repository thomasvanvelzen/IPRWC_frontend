import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class JwtService {
  public getToken(): string {
    return localStorage.getItem('token') as string;
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public destroyToken(): void {
    localStorage.removeItem('token');
  }
}
