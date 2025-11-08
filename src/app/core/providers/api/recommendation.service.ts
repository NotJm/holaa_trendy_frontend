import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { IApiResponse } from "../../interfaces/api.response.interface";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService extends BaseService {

  protected override endpoint: string = 'recommendations';


  public getRecommendationProducts(): Observable<IApiResponse> {
    return this.get<IApiResponse>('', { withCredentials: true })
  }


}