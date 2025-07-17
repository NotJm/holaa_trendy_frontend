import { Component, Input } from "@angular/core";
import { IconControlComponent } from "../../../../shared/ui/controls/icon-control/icon-control.component";

@Component({
  selector: 'state-card',
  standalone: true,
  imports: [IconControlComponent],
  templateUrl: './state-cards.component.html'
})
export class StateCardComponent {
  @Input({ required: true }) measureTitle: string = '';
  @Input() titleClass: string = '';
  @Input({ required: true }) measure: number = 0;
  @Input() measureClass: string = '';
  @Input() iconClass: string = ''
  @Input() cardClass: string = '';
}