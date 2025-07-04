import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  delay,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IProduct } from '../../../../core/interfaces/product.interface';
import { ProductService } from '../../../../core/providers/api/products.service';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { IconControlComponent } from '../../../../shared/ui/controls/icon-control/icon-control.component';
import { InputControlComponent } from '../../../../shared/ui/controls/input-control/input-control.component';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'search-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonControlComponent,
    InputControlComponent,
    SearchItemComponent,
    IconControlComponent,
  ],
  templateUrl: './search.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateY(-10%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  #searchSubject = new Subject<string>();
  #destroy$ = new Subject<void>();

  products: IProduct[] = [];

  showResults = signal<boolean>(false);
  isFocused = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  keyword: string = '';

  constructor(
    private readonly router: Router,
    private readonly productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.onInitializedSearchListener();
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  onInitializedSearchListener(): void {
    this.#searchSubject
      .pipe(
        tap(() => this.isLoading.set(true)),
        delay(3000),
        switchMap((value) => this.handleSearch(value)),
        takeUntil(this.#destroy$)
      )
      .subscribe((products) => this.handleResults(products));
  }

  private handleSearch(value: string): Observable<IProduct[]> {
    if (!value) {
      this.products = [];
      return of([]);
    }

    return this.productsService
      .searchProducts(value)
      .pipe(catchError(() => of([])));
  }

  private handleResults(products: IProduct[]): void {
    this.products = products;
    this.isLoading.set(false);
    this.showResults.set(true);
  }

  onSearch(value: string): void {
    this.keyword = value.trim();
    this.#searchSubject.next(this.keyword);
  }

  onFocus(): void {
    this.isFocused.update((value) => !value);
  }

  onBlur(): void {
    setTimeout(() => {
      this.isFocused.update((value) => !value);
    }, 300);
  }

  onHover(event: Event): void {
    const productElement = event.currentTarget as HTMLElement;

    if (!productElement) return;

    productElement.classList.add('pulse');
  }

  onLeave(event: Event): void {
    const productElement = event.currentTarget as HTMLElement;

    if (!productElement) return;

    productElement.classList.remove('pulse');
  }

  onProductClick(product: IProduct) {
    this.keyword = '';
    this.router.navigate(['products/detail', product.code]);
  }
}
