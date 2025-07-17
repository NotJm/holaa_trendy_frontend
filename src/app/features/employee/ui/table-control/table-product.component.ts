import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  IProduct,
  IVariant,
} from '../../../../core/interfaces/product.interface';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { ImageControlComponent } from '../../../../shared/ui/controls/image-control/image-control.component';
import { NoDataComponent } from "../../../../shared/no-data/no-data.component";

@Component({
  selector: 'table-product',
  standalone: true,
  imports: [
    CommonModule,
    ImageControlComponent,
    ButtonControlComponent,
    NgxPaginationModule,
    NoDataComponent
],
  templateUrl: './table-product.component.html',
})
export class TableProductComponent implements OnChanges, OnInit {
  @Input() tableClass: string = '';
  @Input() theadClass: string = '';
  @Input() tbodyClass: string = '';
  @Input() colsNames: string[] = [];
  @Input() colClass: string = '';
  @Input() rowClass: string = '';
  @Input() trClass: string = '';
  @Input() categorySelected: string = '';
  @Input() searchTerm: string = '';
  @Input() products: IProduct[] = [];

  @Output() editEvent = new EventEmitter<IProduct>();
  @Output() deleteEvent = new EventEmitter<string>();

  public currentPage: number = 1;

  public filteredProduct: IProduct[] = [];

  public ngOnInit(): void {
    this.getFilteredProducts();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] || changes['categorySelected'] || changes['searchTerm']) {
      this.getFilteredProducts();
    }
  }

  public getFilteredProducts(): void {
    this.currentPage = 1;

    this.filteredProduct = this.products.filter((product) => { 
      const matchesSearch =
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.categoryName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        this.categorySelected === 'all' ||
        product.categoryName === this.categorySelected;
      return matchesSearch && matchesCategory;
    });

  }

  public pageEvent(page: number): void {
    this.currentPage = page;
  }

  public getTotalStock(variants: IVariant[]): number {
    return variants.reduce((total, variant) => total + variant.stock, 0);
  }

  public getDisplaySubCategories(subCategoriesNames: string[]): string {
    if (subCategoriesNames.length <= 2) return subCategoriesNames.join(', ');
    return subCategoriesNames.slice(0, 2) + '...';
  }

  public getDisplayVariants(variants: IVariant[]): IVariant[] {
    return variants.slice(0, 2);
  }

  public getStockBadgeClass(stock: number): string {
    const stockBadgeClassBase: string =
      'inline-flex px-2 py-1 text-xs font-semibold rounded-full';

    if (stock === 0) return stockBadgeClassBase + 'bg-red-100 text-red-800';

    if (stock < 10)
      return stockBadgeClassBase + 'bg-yellow-100 text-yellow-800';

    return stockBadgeClassBase + 'bg-green-100 text-green-800';
  }

  public getStockLabel(stock: number): string {
    if (stock === 0) return 'Sin Stock';
    if (stock < 10) return 'Stock Bajo';
    return 'En Stock';
  }
}
