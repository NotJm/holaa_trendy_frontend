import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IColor } from "../../interfaces/color.interface";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseService{

  protected override endpoint = 'colors';

  getColors(): Observable<IColor[]> {
    return this.get<IColor[]>();
  } 

}