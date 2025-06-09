import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { ICategory } from '../../../core/interfaces/categories.interface';
import {
  ISaleByCategory,
  IStockDepletionTime,
} from '../../../core/interfaces/sales.interface';
import { CategoryService } from '../../../core/providers/api/category.service';
import { SaleService } from '../../../core/providers/api/sale.service';
import { IconControlComponent } from '../../../shared/ui/controls/icon-control/icon-control.component';
import { InputControlComponent } from '../../../shared/ui/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/ui/controls/select-control/select-control.component';
import { ProductSalesPieChartComponent } from "../ui/charts/category-sales-pie-chart.component";
import { StockCompareSaleChartComponent } from "../ui/charts/stock-compare-sale-chart.component";
import { MetricCardComponent } from '../ui/metric-card/metric-card.component';
import { StadisticTableComponent } from '../ui/stadisctic-table/stadistic-table.component';
import { ProductSaleCardComponent } from './ui/product-sales/product-sale-card.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MetricCardComponent,
    IconControlComponent,
    SelectControlComponent,
    InputControlComponent,
    StadisticTableComponent,
    ProductSaleCardComponent,
    StockCompareSaleChartComponent,
    ProductSalesPieChartComponent
],
})
export class StatisticsComponent implements OnInit {
  totalInitialStock: number = 0;
  totalSales: number = 0;
  leftStockByCategory: number = 0;
  predictedStockOut: string = '';
  topCategory: string = '';

  // Flags
  isCategorySelected = signal<boolean>(false);
  isProductSelected = signal<boolean>(false);

  // Data selected
  categorySelected: string = '';
  productSelected: string = '';
  initialPeriodSelected: string = '';
  finalPeriodSelected: string = '';

  stockDepletionTime: IStockDepletionTime[] = [];
  categories: ICategory[] = [];
  salesByCategory: ISaleByCategory[] = [];
  backupSalesByCategory: ISaleByCategory[] = [];

  filterSalesByCategory: Omit<ISaleByCategory, 'registerSale'>[] = [];
  salesByProduct: ISaleByCategory[] = [];

  private startDate: Date | null = null;
  private endDate: Date | null = null;

  constructor(
    private readonly saleService: SaleService,
    private readonly categoryService: CategoryService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.fetchStockDepletionTime();
    this.fetchCategories();
  }

  private fetchStockDepletionTime(): void {
    this.saleService.getStockDepletion().subscribe({
      next: (response) => this.onSucess(response),
    });
  }

  private fetchSalesByCategory(categoryName: string): void {
    this.saleService.getSalesByCategory(categoryName).subscribe({
      next: (response) => {
        this.salesByCategory = this.notDuplicateData(response.data);
        this.backupSalesByCategory = [...this.salesByCategory]
        this.salesByCategory = this.generateData(this.salesByCategory);
        this.filterSalesByCategory = this.unifySalesByCategory(this.salesByCategory);
        this.cdr.detectChanges();
      },
    });
  }

  private notDuplicateData(sales: ISaleByCategory[]): ISaleByCategory[] {
    const notDuplicate = sales
      .reduce((acc: any, item: any) => {
        const key = `${item.productName}-${item.registerSale}`;

        if (!acc.has(key)) {
          acc.set(key, item);
        }

        return acc;
      }, new Map())
      .values();
    return Array.from(notDuplicate);
  }

  private generateData(sales: ISaleByCategory[]): ISaleByCategory[] {
    const newSales = [...sales]; 

    newSales.forEach((item) => {
      const countOccurrences = this.countProductsOccurrences(
        newSales,
        item.productName,
      );

      if (countOccurrences === 1) {
        const saleOriginal = newSales.find(
          (sale) => sale.productName === item.productName,
        );

        if (saleOriginal) {
          const saleDuplicated: ISaleByCategory = {
            ...saleOriginal,
            registerSale: new Date(saleOriginal.registerSale), 
            saleQuantity: 5, 
          };

          const originalMonth = saleDuplicated.registerSale.getMonth();
          saleDuplicated.registerSale.setMonth(originalMonth === 2 ? 3 : 2); 

          newSales.push(saleDuplicated);
        }
      }
    });

    return newSales;
  }

  private onSucess(response: IApiResponse): void {
    this.stockDepletionTime = response.data;
    this.calculateMetrics();
  }

  private fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => (this.categories = response.data),
    });
  }

  private calculateMetrics(): void {
    this.totalInitialStock = this.calculateInitialStock();
    this.totalSales = this.calculateTotalSales();
    this.topCategory = this.calculateTopCategory();
    this.predictedStockOut = this.calculatePredicStockOut();
  }

  private calculateInitialStock(): number {
    return this.stockDepletionTime.reduce(
      (acc, cur) => acc + +cur.stockInit,
      0,
    );
  }

  private calculateTotalSales(): number {
    return this.stockDepletionTime.reduce(
      (acc, cur) => acc + +cur.salesMarch + +cur.salesApril,
      0,
    );
  }

  private calculateTopCategory(): string {
    return this.stockDepletionTime.reduce((max, cur) =>
      cur.salesMarch + cur.salesApril > max.salesMarch + max.salesApril
        ? cur
        : max,
    ).categoryName;
  }

  private calculatePredicStockOut(): string {
    return this.stockDepletionTime.reduce((min, cur) =>
      cur.stockOut < min.stockOut ? cur : min,
    ).categoryName;
  }

  private calculateLeftStockByCategory(categoryName: string): number {
    const categoryStock = this.stockDepletionTime.find(
      (item) => item.categoryName === categoryName,
    );

    if (!categoryStock) {
      return 0;
    }

    const totalSale = +categoryStock.salesMarch + +categoryStock.salesApril;

    return +categoryStock.stockInit - +totalSale;
  }

  private unifySalesByCategory(
    sales: ISaleByCategory[],
  ): Omit<ISaleByCategory, 'registerSale'>[] {
    const groupedSales = new Map<
      string,
      Omit<ISaleByCategory, 'registerSale'>
    >();

    sales.forEach(({ registerSale, saleQuantity, stockInitial, ...rest }) => {
      const key = `${rest.categoryName}-${rest.productCode}`; 

      if (groupedSales.has(key)) {
        const existingSale = groupedSales.get(key)!;
        existingSale.saleQuantity += saleQuantity; 
        existingSale.stockInitial += stockInitial; 
      } else {
        groupedSales.set(key, { ...rest, saleQuantity, stockInitial });
      }
    });

    return Array.from(groupedSales.values());
  }

  private filterSalesByProduct(
    sales: ISaleByCategory[],
    productName: string,
  ): ISaleByCategory[] {
    return sales.filter((item) => item.productName === productName);
  }

  private countProductsOccurrences(
    sales: ISaleByCategory[],
    name: string,
  ): number {
    return sales.reduce(
      (acc, sale) => acc + (sale.productName === name ? 1 : 0),
      0,
    );
  }

  // FUNCIONES DE EVENTOS COMPONENTES

  onCategorySelected(category: string): void {
    if (category.length === 0) {
      this.isCategorySelected.set(false);
      this.isProductSelected.set(false);
      return;
    }

    this.isCategorySelected.set(true);
    this.isProductSelected.set(false);
    this.categorySelected = category;
    this.leftStockByCategory = this.calculateLeftStockByCategory(
      this.categorySelected,
    );


    this.fetchSalesByCategory(category);

    
  }

  onProductSelected(productName: string): void {

    this.isProductSelected.set(true);
    this.productSelected = productName;

    // Filtrar las ventas por producto
    this.salesByProduct = this.filterSalesByProduct(
      this.salesByCategory,
      this.productSelected,
    );
  }
}
