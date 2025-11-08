import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponse } from "../../interfaces/api.response.interface";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class SaleService extends BaseService {
  protected override endpoint = "sales";

  public add(): Observable<IApiResponse> {
    return this.post<IApiResponse>('add', {} , { withCredentials: true });
  }

  public getStockDepletion(): Observable<IApiResponse> {
    return this.get<IApiResponse>('stock-depletion', { withCredentials: true })
  }

  public getSalesByCategory(categoryName: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-category/${categoryName}`, { withCredentials: true })
  }

  public getCountSaleToday(): Observable<IApiResponse> {
    return this.get<IApiResponse>('count/today', { withCredentials: true })
  }

  public getIncomeToday(): Observable<IApiResponse> {
    return this.get<IApiResponse>('income/today', { withCredentials: true })
  }

  public getRankingProducts(): Observable<IApiResponse> {
    return this.get<IApiResponse>('ranking', { withCredentials: true })
  }
}
