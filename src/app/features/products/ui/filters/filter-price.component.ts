import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filter-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="mb-4">
    <h4 class="text-sm font-medium mb-2">Precio</h4>
    <div class="flex gap-2">
      <div class="relative flex-1">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >$</span
        >
        <input
          type="number"
          [(ngModel)]="min"
          (change)="onChange()"
          placeholder="Mínimo"
          class="w-full pl-6 pr-2 py-1.5 border rounded-sm text-sm"
        />
      </div>
      <div class="relative flex-1">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >$</span
        >
        <input
          type="number"
          [(ngModel)]="max"
          (change)="onChange()"
          placeholder="Máximo"
          class="w-full pl-6 pr-2 py-1.5 border rounded-sm text-sm"
        />
      </div>
    </div>
  </div>`,
})
export class FilterPriceComponent {
  @Output() onChangeMaxPrice = new EventEmitter<number>();
  @Output() onChangeMinPrice = new EventEmitter<number>();

  max = 0.0
  min = 0.0

  onChange() {
    this.onChangeMaxPrice.emit(this.max)
    this.onChangeMinPrice.emit(this.min)
  }

}
