import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-insert',
  imports: [FormsModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  onSubmit(newProduct: Product) {
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        {
          next: product => {
            console.log('New product saved on server with id: ' + product.id)
            this.productService.refreshList();
            this.router.navigateByUrl('/products');
          },
          error: err => console.log('Could not save product! ' + err.message)
        }
      )
  }

}
