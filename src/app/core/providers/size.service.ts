import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Size } from "../interfaces/size.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SizeService extends BaseService {

  protected override endpoint = "sizes"

  getSizes(): Observable<Size[]> {
    return this.get<Size[]>()
  }

}