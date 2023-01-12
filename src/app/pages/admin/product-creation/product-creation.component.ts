import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/typings/product.type';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
})
export class ProductCreationComponent {
  constructor(private http: HttpClient, public global: GlobalService) {}

  public product: Product = {
    id: null,
    name: null,
    description: null,
    category_id: 'discount',
    price: null,
    image: null,
  };

  public postProduct() {
    this.http
      .post<Product[]>(`${environment.apiURL}/product/create`, this.product)
      .subscribe((products) => {
        this.global.products = products;
      });
  }
}
