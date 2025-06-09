import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../../core/interfaces/categories.interface';
import { CategoryService } from '../../../core/providers/api/category.service';
import { LoadingComponent } from '../../loading-view/loading-view.component';
import { ButtonControlComponent } from '../button/button-control.component';
import { ItemSliderCategoryComponent } from './item-slider-category/item-slider-category.component';

@Component({
  selector: 'slider-categories',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonControlComponent,
    LoadingComponent,
    ItemSliderCategoryComponent,
  ],
  templateUrl: './slider-categories.component.html',
})
export class SliderCategoriesComponent implements AfterViewInit {
  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;

  categories: ICategory[] = [];

  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rewind: true,
    nav: false,
    navSpeed: 1000,
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  };

  constructor(
    private readonly router: Router,
    private readonly categoryService: CategoryService
  ) {}

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: ({ data }) => (this.categories = data),
    });
  }

  onRedirect(category: string): any {
    this.router.navigate(['/products', category.toLowerCase()]);
  }

  next() {
    if (this.owlCarousel) {
      this.owlCarousel.next();
    }
  }

  prev() {
    if (this.owlCarousel) {
      this.owlCarousel.prev();
    }
  }
}
