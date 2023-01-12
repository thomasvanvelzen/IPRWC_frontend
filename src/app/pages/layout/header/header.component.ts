import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private router: Router, private cart: CartService) {}

  public getTotalItemsInCart(): number {
    return this.cart.shoppingCart.reduce((a, b) => a + b.quantity, 0);
  }
}
