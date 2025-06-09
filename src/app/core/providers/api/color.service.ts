import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Color } from "../../interfaces/color.interface";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class ColorService extends BaseService{

  protected override endpoint = 'colors';

  getColors(): Observable<Color[]> {
    return this.get<Color[]>();
  } 

}