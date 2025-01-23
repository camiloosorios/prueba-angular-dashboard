import { Component } from '@angular/core';
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { CardSummaryComponent } from './components/card-summary/card-summary.component';
import { BookOpenCheck, UsersRound, Waypoints } from 'lucide-angular';
import { Location } from '@angular/common';
import { ProductsService } from '../core/services/products.service';
import { SalesHistoryComponent } from "./components/sales-history/sales-history.component";
import { CategoriesDistribution } from "./components/categories-distribution/categories-distribution.component";
import { ProductsTableComponent } from "./components/table-clients/table-clients.component";
@Component({
  selector: 'app-dashboard',
  imports: [CardSummaryComponent, SidebarComponent, HeaderComponent, SalesHistoryComponent, CategoriesDistribution, ProductsTableComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

  readonly lastSalesIcon = UsersRound;
  readonly totalRevenueIcon = Waypoints;
  readonly potentialLostIcon = BookOpenCheck;

  constructor(private location: Location, private productsService : ProductsService) {
    this.location.replaceState('/dashboard');
  }
}
