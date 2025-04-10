import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../../core/interfaces/categories.interface';
import { CategoryService } from '../../../core/providers/category.service';
import { LoadingComponent } from "../../loading/loading.component";
import { ButtonControlComponent } from '../button/button-control.component';
import { ItemSliderComponent } from '../item-slider/item-slider.component';

@Component({
  selector: 'slider-categories',
  imports: [
    CommonModule,
    CarouselModule,
    ItemSliderComponent,
    ButtonControlComponent,
    LoadingComponent
],
  templateUrl: './slider.component.html',
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;
  isLoading: boolean = true;
  categories: ICategory[] = [];
  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    rewind: true,
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
    nav: false,
  };

  constructor(
    private readonly router: Router,
    private readonly categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }

  redirectToProduct(category: string): any {
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
