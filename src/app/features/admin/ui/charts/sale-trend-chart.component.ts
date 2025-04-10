import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexOptions,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ChartComponent,
} from 'ngx-apexcharts';
import { ISaleByCategory } from '../../../../core/interfaces/sales.interface';

@Component({
  selector: 'sales-trend-chart',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <apx-chart
      [series]="series"
      [chart]="chart"
      [xaxis]="xaxis"
      [title]="title"
      [dataLabels]="dataLabels"
      [stroke]="stroke"
      [colors]="colors"
    ></apx-chart>
  `,
})
export class SalesTrendChartComponent implements OnInit {
  @Input() data: ISaleByCategory[] = [];

  chart: ApexChart = {
    type: 'line',  // Usamos un gráfico de líneas
    height: 350,
    toolbar: {
      show: true,
    },
  };

  title: ApexTitleSubtitle = {
    text: 'Evolución de Ventas a lo Largo del Tiempo',
    align: 'center',
    style: {
      fontSize: '16px',
    },
  };

  xaxis: ApexXAxis = {
    type: 'datetime', // Se usa tipo 'datetime' para que las fechas sean correctamente interpretadas
    categories: [],
    title: {
      text: 'Fecha de Registro',
    },
  };

  yaxis: ApexYAxis = {
    title: {
      text: 'Cantidad de Ventas',
    },
  };

  plotOptions: ApexPlotOptions = {};

  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  stroke: ApexStroke = {
    width: 2,
    curve: 'smooth', // Define el suavizado de la línea
  };

  colors: string[] = ['#FF1654'];  // Color para la línea

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
    // Convertimos las fechas y las cantidades de ventas
    this.xaxis = {
      ...this.xaxis,
      categories: this.data.map((item) => new Date(item.registerSale).getTime()),  // Fechas como timestamps
    };

    this.series = [
      {
        name: 'Ventas',
        data: this.data.map((item) => item.saleQuantity),
      },
    ];
  }
}
