import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, DatePipe, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() product: Product;

}
