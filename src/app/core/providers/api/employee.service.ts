import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable()
export class EmployeeService extends BaseService {
  protected override endpoint: string = ''

}