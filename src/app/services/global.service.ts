import { Injectable, OnInit } from '@angular/core';
import { Product } from '../typings/product.type';
import { User } from '../typings/user.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class GlobalService implements OnInit {
  public user!: User;
  public products: Product[] = [];
  

  constructor(private http: HttpClient) {
    this.initializeUser();
    this.loadProducts();
  }

  ngOnInit(): void {}

  initializeUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = decode(token as string) as User;
      this.user = tokenPayload;
    }
  }

  private loadProducts() {
    this.http
      .get<Product[]>(`${environment.apiURL}/product/all`)
      .subscribe((products) => {
        this.products = products;
      });
  }
}
