import { Component, Input } from '@angular/core';
import { IconControlComponent } from "../ui/controls/icon-control/icon-control.component";

@Component({
  selector: 'loading-view',
  standalone: true,
  templateUrl: './loading-view.component.html',
  imports: [IconControlComponent],
})
export class LoadingComponent {
  @Input({ required: true }) loadingMessage!: string;
}
