import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISaleByCategory } from '../../../../core/interfaces/sales.interface';

@Component({
  selector: 'stadistic-table',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Reporte de ventas</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Categoría
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Producto
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Código
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock Inicial
            </th>

            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Cantidad Vendida
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let item of salesData; let i = index">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ item.categoryName | titlecase }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center">
                <div class="shrink-0 h-10 w-10 mr-3">
                  <img
                    class="h-10 w-10 rounded-full object-cover"
                    [src]="item.productImage || 'assets/placeholder.png'"
                    [alt]="item.productName"
                  />
                </div>
                <div>
                  {{ item.productName }}
                </div>
              </div>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
            >
              {{ item.productCode }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
            >
              {{ item.stockInitial }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ item.saleQuantity }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <button
                (click)="onActionClick(item)"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-xs text-white bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Detalle
              </button>
            </td>
          </tr>
          <tr *ngIf="!salesData || salesData.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
              No hay datos disponibles
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,
})
export class StadisticTableComponent {
  @Input({ required: true }) salesData: any[] = [];
  @Output() actionClick = new EventEmitter<string>();

  onActionClick(item: any): void {
    this.actionClick.emit(item?.productName);
  }
}
