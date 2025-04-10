import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WishList } from "../interfaces/wishlist.interface";
import { BaseService } from "./base.service";
import { IApiResponse } from "../interfaces/api.response.interface";

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends BaseService {
  protected override endpoint: string = 'wishlist';

  /**
   * Handle logic for gets user's wish list 
   * @returns An observable that containing the user's wishlist 
   */
  getWishList(): Observable<IApiResponse> {
    return this.get<IApiResponse>('', { withCredentials: true })
  }

  /**
   * Handle logic for adds product to the user's wish list
   * @param productCode An unique identifier of the product 
   * @returns An observable that containing nothing
   */
  addProduct(productCode: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(`add/${productCode}`, {} , { withCredentials: true })
  }

  /**
   * Handle logic for removes product to the user's wish list
   * @param productCode An unique identifier of the product
   * @returns An observable that containing nothing
   */
  removeProduct(productCode: string): Observable<void> {
    return this.post<void>(`remove/${productCode}`, { withCredentials: true })
  }



}