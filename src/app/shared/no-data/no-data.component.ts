import { Component, Input } from "@angular/core";
import { IconControlComponent } from "../ui/controls/icon-control/icon-control.component";

@Component({
  selector: 'no-data',
  standalone: true,
  imports: [IconControlComponent],
  templateUrl: './no-data.component.html'
})
export class NoDataComponent {
  @Input() noDataTitle: string = 'No hay datos disponibles';
  @Input() noDataDescription: string = 'Los datos ayudan a organizar mejor la informacion'
  @Input() iconClass: string = '';
}