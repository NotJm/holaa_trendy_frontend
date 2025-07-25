import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response.interface';
import {
  IAddProductToCart,
  IUpdateProductToCart,
} from '../../interfaces/cart.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseService {
  protected override endpoint = 'cart';

  constructor() {
    super();
  }

  getCart(): Observable<IApiResponse> {
    return this.get<IApiResponse>('', {
      withCredentials: true,
    }).pipe(shareReplay(1));
  }

  addProductToCart(addProduct: IAddProductToCart): Observable<IApiResponse> {
    return this.post<IApiResponse>('add', addProduct, {
      withCredentials: true,
    });
  }

  updateQuantityProductToCart(
    updateQuantity: IUpdateProductToCart
  ): Observable<IApiResponse> {
    return this.put<IApiResponse>('update/quantity', updateQuantity, {
      withCredentials: true,
    });
  }

  removeProductToCart(productCode: string): Observable<IApiResponse> {
    return this.delete<IApiResponse>(
      `remove/${productCode}`,
      {},
      { withCredentials: true }
    );
  }
}
