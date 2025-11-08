import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response.interface';
import { IFeaturedProduct, IProduct } from '../../interfaces/product.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  private options = {
    withCredentials: true,
  };

  protected override endpoint = 'products';

  constructor() {
    super();
  }

  /**
   * Get all product provide of the API
   * @returns An observable that resolves when the products is successfully retrieved
   */
  getProducts(): Observable<IApiResponse> {
    return this.get<IApiResponse>();
  }

  /**
   * Get all products by view
   * @param view view's name provide to the data base
   * @returns An observable than resolves when the products is successfully retrieved
   */
  getProductsByFeatured(
    view: 'new-arrivals' | 'best-offers' | 'best-sellers',
  ): Observable<IApiResponse> {
    return this.get<IApiResponse>(`view/${view}`);
  }

  getLowStockProducts(): Observable<IApiResponse> {
    return this.get<IApiResponse>('low-stock', { withCredentials: true })
  }

  /**
   *
   * @param keyword keyword for search product
   * @returns
   */
  searchProducts(keyword: string): Observable<IProduct[]> {
    const encodedKeyword = encodeURIComponent(keyword);
    return this.get<IProduct[]>(
      `search?keyword=${encodedKeyword}`,
    ).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      }),
    );
  }

  getProductByCode(code: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-code/${code}`);
  }

  // Metodo que obtieene los productos por categoria
  getProductsByCategory(category: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-category/${category}`).pipe();
  }

  getFilteredProducts(
    category: string,
    subCategory: string,
    size: string,
    minPrice: number,
    maxPrice: number,
    color: string,
  ): Observable<IProduct[]> {
    let params: any = {};

    params.category = category;

    if (subCategory) {
      params.subCategory = subCategory;
    }

    if (size) {
      params.size = size;
    }
    if (color) {
      params.color = color;
    }

    if (minPrice) {
      params.minPrice = minPrice;
    }

    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    return this.get<IProduct[]>('filter', { params });
  }

  /**
   * Metodo para crear un producto
   * @param data estructura para crear un producto
   * @returns respuesta del servidor
   */
  createProduct(data: IProduct): Observable<any> {
    return this.post('create', data, this.options)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  updateProduct(
    data: Partial<IProduct>,
  ): Observable<IApiResponse> {
    return this.put<IApiResponse>(`update`, data, this.options)
  }
}
