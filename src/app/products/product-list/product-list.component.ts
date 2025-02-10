import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, UpperCasePipe, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  selectedProduct: Product;

  private productService = inject(ProductService);

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  title: string = 'Products';

  products: Product[] = this.productService.getProducts();
}
