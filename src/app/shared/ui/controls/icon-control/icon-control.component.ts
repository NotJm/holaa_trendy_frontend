import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'icon-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-control.component.html',
})
export class IconControlComponent {
  @Input({ required: true }) iconClass!: string;
  @Input() hasText: boolean = false;
  @Input() text: string = '';
}