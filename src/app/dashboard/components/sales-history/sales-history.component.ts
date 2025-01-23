import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartNoAxesColumnIncreasing, LucideAngularModule, TrendingUp } from 'lucide-angular';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [LucideAngularModule, BaseChartDirective],
  templateUrl: './sales-history.component.html',
})
export class SalesHistoryComponent implements OnInit {
  public trendingIcon = TrendingUp;
  public barIcon = ChartNoAxesColumnIncreasing;

  public barChartData = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        data: [2000, 1300, 7200, 3500, 4800, 3500, 3700, 5000, 6500],
        label: 'New Customers',
        fill: true,
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        tension: 0.4,
      },
      {
        data: [3000, 1800, 1200, 2500, 1300, 2500, 3500, 3700, 4000],
        label: 'Old Customers',
        fill: true,
        borderColor: '#88ca9d',
        backgroundColor: 'rgba(136, 202, 157, 0.2)',
        tension: 0.4,
      },
    ],
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
