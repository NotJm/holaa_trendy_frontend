import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconControlComponent } from '../ui/controls/icon-control/icon-control.component';

@Component({
  selector: 'stat-card',
  standalone: true,
  imports: [CommonModule, IconControlComponent],
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  @Input({ required: true }) titleCard!: string;
  @Input({ required: true }) measure!: string;
  @Input({ required: true }) iconClass!: string;
  @Input() hasMoreMetrics: boolean = false;
  @Input() percentage: number = 0.0;
  @Input() label: string = '';
}
