import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  protected override endpoint = 'category';

  getCategories(): Observable<IApiResponse> {
    return this.get<IApiResponse>().pipe();
  }
}
