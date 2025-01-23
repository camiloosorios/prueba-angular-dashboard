import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { LucideAngularModule, Percent } from 'lucide-angular';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-categories-distribution',
  standalone: true,
  imports: [LucideAngularModule, BaseChartDirective],
  templateUrl: './categories-distribution.component.html'
})
export class CategoriesDistribution {

  public pieChartData = {
    labels: ["men's clothing", 'jewelery', 'electronics', "women's clothing"],
    datasets: [
      {
        label: 'Product Categories',
        data: [4, 4, 5, 5],
        backgroundColor: [
          '#FFBB28',
          '#c4dbd7',
          '#8884D8',
          '#FF8042'
        ]
      }
    ]
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };

  public percentIcon = Percent;
}
