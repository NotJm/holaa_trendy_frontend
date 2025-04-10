import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexOptions,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ngx-apexcharts';
import { ISaleByCategory } from '../../../../core/interfaces/sales.interface';

@Component({
  selector: 'stock-compare-sale-chart',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <apx-chart
      [series]="series"
      [chart]="chart"
      [xaxis]="xaxis"
      [title]="title"
      [plotOptions]="plotOptions"
      [dataLabels]="dataLabels"
      [colors]="colors"
    ></apx-chart>
  `,
})
export class StockCompareSaleChartComponent implements OnInit, OnChanges {
  @Input({ required: true }) data: ISaleByCategory[] = [];

  chart: ApexChart = {
    type: 'bar',
    height: 350,
    stacked: false,
    toolbar: {
      show: true,
    },
  };

  title: ApexTitleSubtitle = {
    text: 'Comparativa de Stock Inicial y Ventas',
    align: 'center',
    style: {
      fontSize: '16px',
    },
  };

  xaxis: ApexXAxis = {
    categories: [],
    title: {
      text: 'Productos',
    },
  };

  yaxis: ApexYAxis = {
    title: {
      text: 'Cantidad',
    },
  };

  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '55%',
    },
  };

  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  colors: string[] = ['#008FFB', '#00E396'];

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
    // Actualizar cada propiedad individualmente
    this.xaxis = {
      ...this.xaxis,
      categories: this.data.map((item) => item.productName),
    };

    this.series = [
      {
        name: 'Stock Inicial',
        data: this.data.map((item) => item.stockInitial),
      },
      {
        name: 'Ventas',
        data: this.data.map((item) => item.saleQuantity),
      },
    ];
  }
}
