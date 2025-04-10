import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../interfaces/sub-category.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends BaseService {
  protected override endpoint = 'sub-category';

  constructor() {
    super();
  }

  getSubCategoriesByCategory(category: string): Observable<SubCategory[]> {
    return this.get<SubCategory[]>(`by-category/${category}`, {
      withCredentials: true,
    });
  }
}
