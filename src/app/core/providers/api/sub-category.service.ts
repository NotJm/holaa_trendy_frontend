import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubCategory } from '../../interfaces/sub-category.interface';
import { BaseService } from './base.service';
import { IApiResponse } from '../../interfaces/api.response.interface';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends BaseService {
  protected override endpoint = 'sub-category';

  constructor() {
    super();
  }

  getSubCategoriesByCategory(category: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-category/${category}`, {
      withCredentials: true,
    });
  }
}
