import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.API_URL;

  private productsBehavior = new BehaviorSubject<Product[]>([]);
  private categoriesBehavior = new BehaviorSubject<string[]>([]);
  public products$ = this.productsBehavior.asObservable();
  public categories$ = this.categoriesBehavior.asObservable();
  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: (data) => {
        this.productsBehavior.next(data);
        const categories = Array.from(new Set(data.map((product) => product.category)));
        this.categoriesBehavior.next(categories);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addProduct(product: Product): void {
    const currentProducts = this.productsBehavior.value;
    this.productsBehavior.next([product, ...currentProducts]);
  }

  deleteProduct(id: Product['id']): void {
    const updatedProducts = this.productsBehavior.value.filter((product) => product.id !== id);
    this.productsBehavior.next(updatedProducts);
  }

  updateProduct(product: Product): void {
    const updatedProducts = this.productsBehavior.value.map((p) =>
      p.id === product.id ? product : p
    );
    this.productsBehavior.next(updatedProducts);
  }
}
