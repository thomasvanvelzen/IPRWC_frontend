import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Product } from 'src/app/typings/product.type';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class CartService {
  public shoppingCart: { productId: string; quantity: number }[] = [];
  public shoppingCartWithProducts: { product: Product; quantity: number }[] =
    [];

  constructor(private http: HttpClient) {
    this.initializeShoppingCart();
  }

  private initializeShoppingCart(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.shoppingCart = JSON.parse(cart);
    }
  }

  public addItemToCart(productId: string): void {
    const item = this.shoppingCart.find((item) => item.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      this.shoppingCart.push({ productId, quantity: 1 });
    }
    this.saveShoppingCart();
    this.getProductsFromIdsInCart();
  }

  public removeItemFromCart(productId: string): void {
    const item = this.shoppingCart.find((item) => item.productId === productId);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.shoppingCart = this.shoppingCart.filter(
          (item) => item.productId !== productId
        );
      }
    }
    this.saveShoppingCart();
    this.getProductsFromIdsInCart();
  }

  public removeItemFromCartCompletely(productId: string): void {
    this.shoppingCart = this.shoppingCart.filter(
      (item) => item.productId !== productId
    );
    this.saveShoppingCart();
    this.getProductsFromIdsInCart();
  }

  public saveShoppingCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
  }

  public getProductsFromIdsInCart(): void {
    const productIds = this.shoppingCart.map((item) => item.productId);
    this.http
      .post<Product[]>(`${environment.apiURL}/product/many`, productIds)
      .subscribe(
        (products) => {
          this.shoppingCartWithProducts = products.map((product) => {
            const quantity = this.shoppingCart.find(
              (item) => item.productId === product.id
            )?.quantity;
            return { product, quantity: quantity || 0 };
          });
        },
        //TODO: Handle error
        (error) => {
          if (error.status === 401) localStorage.removeItem('token');
        }
      );
  }
}
