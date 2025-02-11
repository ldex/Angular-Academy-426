import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';
  products$: Observable<Product[]>

  constructor(private http: HttpClient) {
    this.initProducts()
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id: number): Observable<Product> {
    return this
            .products$
            .pipe(
              map(products => products.find(product => product.id == id))
            )
  }

  refreshList() {
    this.initProducts();
  }

  private initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        tap(console.table),
                        delay(1500), // Pour la démo!!
                        shareReplay()
                      );
  }
}
