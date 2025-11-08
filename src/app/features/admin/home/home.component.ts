import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IActivity } from '../../../core/interfaces/activity.interface';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import {
  ILowStockProduct,
  IRanking,
} from '../../../core/interfaces/product.interface';
import { ProductService } from '../../../core/providers/api/products.service';
import { UserService } from '../../../core/providers/api/user.service';
import { ActivitysComponent } from '../../../shared/activitys/activitys.component';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { SaleService } from '../../../core/providers/api/sale.service';
import { LowStockListComponent } from '../../../shared/low-stock-list/low-stock-list.component';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ActivitysComponent,
    StatCardComponent,
    LowStockListComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeAdminComponent implements OnInit, OnDestroy {
  /** A subject for destroying the components */
  #destroy$ = new Subject<void>();
  /** A signal for admin's username */
  userName: string = 'Admin';

  totalUserCount = signal<number>(0);
  totalUserCountToday = signal<number>(0);
  totalUserActiveCount = signal<number>(0);

  totalSale = signal<number>(0);
  totalIncome = signal<number>(0);

  activitys = signal<IActivity[]>([]);
  lowStockProducts = signal<ILowStockProduct[]>([]);
  rankingProducts = signal<IRanking[]>([]);

  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.getUserName();

    this.getTotalCount();
    this.getTotalCountToday();
    this.getTotalCountActive();
    this.getActivtitys();
    this.getLowStockProducts();
    this.getRankingProducts();
    this.getTotalSales();
    this.getIncomeSales();
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private getUserName(): void {
    const cachedUser = this.userService.getCachedUser();
    if (cachedUser) this.userName = cachedUser.username;

    this.userService.getUserData().subscribe({
      next: (response: IApiResponse) => {
        this.userName = response.data.username;
      },
    });
  }

  private getTotalCount(): void {
    this.userService
      .getUserCount()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) =>
          this.totalUserCount.set(response.data),
      });
  }

  private getTotalCountToday(): void {
    this.userService
      .getUserCountToday()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) =>
          this.totalUserCountToday.set(response.data),
      });
  }

  private getTotalCountActive(): void {
    this.userService
      .getUserCountActive()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) =>
          this.totalUserActiveCount.set(response.data),
      });
  }

  private getActivtitys(): void {
    this.userService
      .getActivitys()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => this.activitys.set(response.data),
      });
  }

  private getLowStockProducts(): void {
    this.productService
      .getLowStockProducts()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) =>
          this.lowStockProducts.set(response.data),
      });
  }

  private getTotalSales(): void {
    this.saleService
      .getCountSaleToday()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => this.totalSale.set(response.data),
      });
  }

  private getIncomeSales(): void {
    this.saleService
      .getIncomeToday()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => this.totalIncome.set(response.data),
      });
  }

  private getRankingProducts(): void {
    this.saleService
      .getRankingProducts()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) =>
          this.rankingProducts.set(response.data),
      });
  }
}
