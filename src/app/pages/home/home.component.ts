import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { GlobalService } from '../../services/global.service';
import { Product } from 'src/app/typings/product.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public shownProducts: Product[] = [];

  constructor(public global: GlobalService) {}

  ngOnInit(): void {
    this.initializeProducts();
  }

  initializeProducts() {
    const loader = setInterval(() => {
      if (this.global.products.length > 0) {
        this.shownProducts = this.getTwelveRandomUniqueProducts();
        clearInterval(loader);
      }
    }, 1);
  }

  options: AnimationOptions = {
    path: '/assets/sportswear.json',
  };
  options2: AnimationOptions = {
    path: '/assets/weightlifting.json',
  };
  options3: AnimationOptions = {
    path: '/assets/cardio.json',
  };
  options4: AnimationOptions = {
    path: '/assets/bodyweight.json',
  };
  sale: AnimationOptions = {
    path: '/assets/sale.json',
  };

  private getTwelveRandomUniqueProducts() {
    const products: Product[] = [];
    while (products.length < 12) {
      const randomProduct = this.global.products[
        Math.floor(Math.random() * this.global.products.length)
      ];
      if (!products.includes(randomProduct)) products.push(randomProduct);
    }
    return products;
  }
}
