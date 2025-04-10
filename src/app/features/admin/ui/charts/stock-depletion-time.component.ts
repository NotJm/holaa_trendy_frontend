import {
  Component,
  Input,
  type OnInit,
  type SimpleChanges,
} from '@angular/core';
import {
  type ApexChart,
  type ApexXAxis,
  type ApexYAxis,
  type ApexTitleSubtitle,
  type ApexAxisChartSeries,
  type ApexDataLabels,
  type ApexPlotOptions,
  type ApexStroke,
  ChartComponent,
} from 'ngx-apexcharts';

@Component({
  selector: 'stock-depletion-chart',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <div
      class="mt-6 border border-gray-100 rounded-lg shadow-md bg-white overflow-hidden"
    >
      <div class="bg-primary/5 p-6 pb-2">
        <h2 class="flex items-center text-xl font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          Proyección de Agotamiento de Stock
        </h2>
        <p class="text-sm text-gray-500">
          Basado en la tendencia de ventas actuales
        </p>
      </div>

      <div class="p-6">
        <div
          class="flex flex-col md:flex-row items-center justify-between mb-6"
        >
          <div class="flex items-center mb-4 md:mb-0">
            <div class="p-2 rounded-full bg-primary/10 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">
                Tiempo estimado hasta agotamiento
              </p>
              <p class="font-medium">
                {{ monthsUntilDepletion }}
                {{ monthsUntilDepletion > 1 ? 'meses' : 'mes' }}
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <div class="p-2 rounded-full bg-primary/10 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Stock inicial</p>
              <p class="font-medium">{{ initialStock }} unidades</p>
            </div>
          </div>
        </div>

        <div class="chart-container" style="position: relative; height: 300px;">
          <apx-chart
            [series]="series"
            [chart]="chart"
            [xaxis]="xaxis"
            [yaxis]="yaxis"
            [title]="title"
            [dataLabels]="dataLabels"
            [stroke]="stroke"
            [colors]="colors"
          ></apx-chart>
        </div>

        <div class="mt-4 text-center text-sm text-gray-500">
          <p>
            Esta proyección está basada en la tendencia de ventas actuales y
            puede variar.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class StockDepletionChartComponent implements OnInit {
  @Input({ required: true }) monthsUntilDepletion!: number; // Ejemplo: el stock se agotará en 6 meses
  @Input({ required: true }) initialStock: number = 200; // Ejemplo: stock inicial de 500

  chart: ApexChart = {
    type: 'line', // Usamos un gráfico de líneas
    height: 350,
    toolbar: {
      show: true,
    },
  };

  title: ApexTitleSubtitle = {
    text: 'Predicción de Agotamiento de Stock',
    align: 'center',
    style: {
      fontSize: '16px',
    },
  };

  xaxis: ApexXAxis = {
    categories: [], // Se llenará con los nombres reales de los meses
    title: {
      text: 'Meses',
    },
  };

  yaxis: ApexYAxis = {
    title: {
      text: 'Stock Restante',
    },
    min: 0, // Aseguramos que el gráfico empiece desde 0 en el eje Y
  };

  plotOptions: ApexPlotOptions = {};

  dataLabels: ApexDataLabels = {
    enabled: false, // Desactivamos las etiquetas de datos en los puntos de la línea
  };

  stroke: ApexStroke = {
    width: 3,
    curve: 'smooth', // Define el suavizado de la línea
  };

  colors: string[] = ['#4A90E2']; // Color de la línea

  series: ApexAxisChartSeries = [
    { name: 'Stock Restante', data: [] as { x: string; y: number }[] },
  ];

  ngOnInit(): void {
    this.generateStockDepletionData();
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthsUntilDepletion'] || changes['initialStock']) {
      this.generateStockDepletionData();
      this.updateChart();
    }
  }

  private generateStockDepletionData(): void {
    // Validar entradas
    if (this.monthsUntilDepletion <= 0 || this.initialStock <= 0) {
      this.xaxis.categories = ['Sin datos'];
      this.series = [
        { name: 'Stock Restante', data: [{ x: 'Sin datos', y: 0 }] },
      ];
      return;
    }

    let remainingStock: number = this.initialStock;
    const depletionStep: number = this.initialStock / this.monthsUntilDepletion;

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    this.xaxis.categories = [];
    this.series = [{ name: 'Stock Restante', data: [] }];

    // Agregar el mes actual y el stock inicial
    this.xaxis.categories.push(months[currentMonthIndex]);
    (this.series[0].data as { x: string; y: number }[]).push({
      x: months[currentMonthIndex],
      y: this.initialStock,
    });

    for (let i = 1; i <= this.monthsUntilDepletion; i++) {
      const monthIndex = (currentMonthIndex + i) % 12;
      const monthName = months[monthIndex];

      this.xaxis.categories.push(monthName);

      remainingStock = Math.max(
        parseFloat((remainingStock - depletionStep).toFixed(0)),
        0,
      );
      (this.series[0].data as { x: string; y: number }[]).push({
        x: monthName,
        y: remainingStock,
      }); // Ahora es un objeto válido
    }
  }

  private updateChart(): void {
    // Aquí puedes actualizar cualquier opción adicional del gráfico si fuera necesario
  }
}
