import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ISaleByCategory } from '../../../../../core/interfaces/sales.interface';
import { CommonModule } from '@angular/common';
import { IconControlComponent } from '../../../../../shared/ui/controls/icon-control/icon-control.component';
import { StockDepletionChartComponent } from "../../../ui/charts/stock-depletion-time.component";

@Component({
  selector: 'product-sale-card',
  standalone: true,
  imports: [CommonModule, IconControlComponent, StockDepletionChartComponent],
  templateUrl: './product-sale-card.component.html',
})
export class ProductSaleCardComponent implements OnChanges {
  @Input({ required: true }) productSales: ISaleByCategory[] = [];
  @Output() onReturn = new EventEmitter<boolean>();

  math!: Math;

  productName: string = '';
  categoryName: string = '';
  productImage: string = '';
  stockInitial: number = 0;
  totalSales: number = 0;

  totalSalesMarch: number = 0;
  totalSalesApril: number = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.productSales && this.productSales.length > 0) {
      this.updateProductData();
    }
  }

  private updateProductData(): void {
    this.productName = this.productSales[0].productName;
    this.categoryName = this.productSales[0].categoryName;
    this.productImage = this.productSales[0].productImage;
    this.stockInitial = this.productSales.reduce(
      (acc, cur) => acc + +cur.stockInitial,
      0,
    );
    this.totalSales = this.productSales.reduce(
      (acc, cur) => acc + +cur.saleQuantity,
      0,
    );
    this.totalSalesMarch = this.productSales
      .filter((sale) => new Date(sale.registerSale).getMonth() === 2)
      .reduce((acc, cur) => acc + +cur.saleQuantity, 0);

    this.totalSalesApril = this.productSales
      .filter((sale) => new Date(sale.registerSale).getMonth() === 3)
      .reduce((acc, cur) => acc + +cur.saleQuantity, 0);

    this.cdr.detectChanges();
  }

  calculateK(salesInMonth: number): number {
    const s = this.stockInitial - salesInMonth;

    const c = this.stockInitial;

    const k = Math.log(s / c);

    return k;
  }

  calculateTrend(salesInMonth: number): number {
    return -this.calculateK(salesInMonth) * 100;
  }

  calculateT(): number {
    const c = this.stockInitial;

    const k = this.calculateK(
      this.totalSalesApril > this.totalSalesMarch
        ? this.totalSalesApril
        : this.totalSalesMarch,
    );

    const ln = Math.log(1 / c);

    const t = ln / k;

    return parseInt(t.toFixed(0));
  }

  getPercentageSold(): number {
    if (!this.stockInitial) return 0;
    return Math.min(
      Math.round((this.totalSales / this.stockInitial) * 100),
      100,
    );
  }

  goBackToTable(): void {
    this.onReturn.emit(false);
  }
}
