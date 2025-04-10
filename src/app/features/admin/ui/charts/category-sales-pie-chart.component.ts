import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ngx-apexcharts';
import { ISaleByCategory } from '../../../../core/interfaces/sales.interface';

@Component({
  selector: 'product-sales-pie-chart',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <apx-chart
      [series]="series"
      [chart]="chart"
      [labels]="labels"
      [title]="title"
      [colors]="colors"
    ></apx-chart>
  `,
})
export class ProductSalesPieChartComponent implements OnInit, OnChanges {
  @Input({ required: true }) data: ISaleByCategory[] = [];
  @Input() categorySelected: string = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  chart: ApexChart = {
    type: 'pie',
    height: 350,
  };

  title: ApexTitleSubtitle = {
    text: 'Distribución de Ventas por Categoria',
    align: 'center',
  };

  colors: string[] = ['#FFB900', '#008FFB', '#00E396', '#FEB019'];

  labels: string[] = [];

  series: ApexAxisChartSeries = [];

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.updateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const productSales = this.data.reduce((acc: any, item: any) => {
      if (!acc[item.productName]) {
        acc[item.productName] = 0;
      }
      acc[item.productName] += item.saleQuantity;
      return acc;
    }, {});

    this.labels = Object.keys(productSales);
    this.series = Object.values(productSales);
  }
}
