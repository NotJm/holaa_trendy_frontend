import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color } from '../../../../core/interfaces/color.interface';

@Component({
  selector: 'filter-colors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="mb-4">
    <h4 class="text-sm font-medium mb-2">Colores</h4>
    <select
      [(ngModel)]="selectColor"
      (change)="onSelected()"
      class="w-full border rounded-sm px-3 py-2 text-sm"
    >
      <option value="">Todos</option>
      @for(color of colors; track color.id) {
      <option [value]="color.name">{{ color.name | titlecase }}</option>
      }
    </select>
  </div>`,
})
export class FilterColorsComponent {
  @Input({ required: true }) colors!: Color[];
  @Output() onSelectedColor = new EventEmitter<string>();

  selectColor = '';

onSelected() {
    this.onSelectedColor.emit(this.selectColor);
  }
}
