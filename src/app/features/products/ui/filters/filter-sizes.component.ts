import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Size } from '../../../../core/interfaces/size.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filter-sizes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <div class="mb-4">
    <h4 class="text-sm font-medium mb-2">Talla</h4>
    <select
      [(ngModel)]="selectedSize"
      (change)="onSelected()"
      class="w-full border rounded-sm px-3 py-2 text-sm"
    >
      <option value="">Todas</option>
      @for(size of sizes; track size.id) {
        <option [value]="size.name">{{ size.name }}</option>
      }
    </select>
  </div>`,
})
export class FilterSizesComponent {
  @Input({ required: true }) sizes!: Size[];
  @Output() onSelectedSize = new EventEmitter<string>();

  selectedSize = ''

  onSelected() {
    this.onSelectedSize.emit(this.selectedSize)
  }
}
