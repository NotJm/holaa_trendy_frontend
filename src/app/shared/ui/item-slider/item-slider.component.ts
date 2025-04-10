import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnpicImageDirective } from '@unpic/angular';
import { ICategory } from '../../../core/interfaces/categories.interface';


@Component({
  selector: 'item-slider',
  standalone: true,
  imports: [CommonModule, UnpicImageDirective],
  template: `<div
    class="w-full shrink-0 px-2 group cursor-pointer"
    (click)="onClick()"
  >
    <div class="relative overflow-hidden">
      <!-- Imagen -->
      <img
        unpic
        [src]="category.imgUri"
        [alt]="category.name"
        loading="lazy"
        class="w-full h-[800px] object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <!-- Overlay con título -->
      <div
        class="absolute inset-0 bg-black/30 flex items-center justify-center p-8 transition-all duration-300 group-hover:bg-black/20"
      >
        <h3 class="font-bebas text-white text-6xl font-bold tracking-widest">
          {{ category.name }}
        </h3>
      </div>
    </div>
  </div>`,
})
export class ItemSliderComponent {
  @Input({ required: true }) category!: ICategory;
  @Output() onSelectedCategory = new EventEmitter<string>();


  onClick() {
    this.onSelectedCategory.emit(this.category.name);
  }
}
