import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../../core/interfaces/categories.interface';
import { ImageControlComponent } from '../../controls/image-control/image-control.component';

@Component({
  selector: 'item-slider-category',
  standalone: true,
  imports: [CommonModule, ImageControlComponent],
  template: `<div
    class="w-full flex-shrink-0 px-2 group cursor-pointer"
    (click)="this.onSelectedCategory.emit(this.category.name)">
    <div class="relative overflow-hidden">
      <image-control
        [src]="category.imgUri"
        [alt]="category.name"
        imageClass="w-full h-[800px] object-cover transition-transform duration-300 group-hover:scale-125"
      />

      <div class="absolute inset-0 bg-black/30 flex items-center justify-center p-8 transition-all duration-300 group-hover:bg-black/20">
        <h3 class="font-bebas text-white text-6xl font-bold tracking-widest">
          {{ category.name }}
        </h3>
      </div>
    </div>
  </div>`,
})
export class ItemSliderCategoryComponent {
  @Input({ required: true }) category!: ICategory;
  @Output() onSelectedCategory = new EventEmitter<string>();
}
