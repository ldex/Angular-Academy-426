import { Component, inject, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Product } from '../../models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, DatePipe, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() product: Product;

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private productService = inject(ProductService)

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        {
          next: () => {
            console.log('Product deleted!')
            this.productService.refreshList()
            this.router.navigateByUrl('/products')
          },
          error: err => console.log('Could not delete product! ' + err.message)
        }
      )
  }

  constructor() {
    let id = this.activatedRoute.snapshot.params['id'];

    this
      .productService
      .getProductById(id)
      .subscribe(
        data => this.product = data
      )
  }

}
