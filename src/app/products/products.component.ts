import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { ProductsTableComponent } from "./components/products-table/products-table.component";
import { ProductsService } from '../core/services/products.service';
import { Product } from '../core/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule, SidebarComponent, HeaderComponent, ProductsTableComponent],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {

  public products : Product[] = [];

  constructor( private productsService : ProductsService ) { }
  
  ngOnInit(): void {
    this.productsService.products$.subscribe(data => {
      this.products = data;
    });
  }

}
