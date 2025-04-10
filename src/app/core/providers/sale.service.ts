import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Cart } from "../interfaces/cart.interface";
import { IApiResponse } from "../interfaces/api.response.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SaleService extends BaseService {
  protected override endpoint = "sales";

  add(): Observable<IApiResponse> {
    return this.post<IApiResponse>('add', {} , { withCredentials: true });
  }

  getStockDepletion(): Observable<IApiResponse> {
    return this.get<IApiResponse>('stock-depletion', { withCredentials: true })
  }

  getSalesByCategory(categoryName: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-category/${categoryName}`, { withCredentials: true })
  }
}
