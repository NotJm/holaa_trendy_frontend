import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IApiResponse } from '../interfaces/api.response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  protected override endpoint = 'category';

  getCategories(): Observable<IApiResponse> {
    return this.get<IApiResponse>().pipe();
  }
}
