import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISize } from "../../interfaces/size.interface";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class SizeService extends BaseService {

  protected override endpoint = "sizes"

  getSizes(): Observable<ISize[]> {
    return this.get<ISize[]>()
  }

}