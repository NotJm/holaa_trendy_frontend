import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { IColor } from '../../../core/interfaces/color.interface';
import { IProduct } from '../../../core/interfaces/product.interface';
import { ISize } from '../../../core/interfaces/size.interface';
import { ISubCategory } from '../../../core/interfaces/sub-category.interface';
import { ColorService } from '../../../core/providers/api/color.service';
import { ProductService } from '../../../core/providers/api/products.service';
import { SizeService } from '../../../core/providers/api/size.service';
import { SubCategoryService } from '../../../core/providers/api/sub-category.service';
import { FilterColorsComponent } from '../ui/filters/filter-colors.component';
import { FilterPriceComponent } from '../ui/filters/filter-price.component';
import { FilterSizesComponent } from '../ui/filters/filter-sizes.component';
import { FilterSubCategoryComponent } from '../ui/filters/filter-subcategory.component';
import { ProductCardComponent } from '../ui/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductCardComponent,
    FilterSubCategoryComponent,
    FilterPriceComponent,
    FilterSizesComponent,
    FilterColorsComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  subCategories: ISubCategory[] = [];
  sizes: ISize[] = [];
  colors: IColor[] = [];

  category = '';

  selectedSubCategory = '';
  selectedSize = '';
  selectColor = '';

  maxPrice = 0.0;
  minPrice = 0.0;

  hasMoreProducts: boolean = false;
  

  isLoading = true;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly productsService: ProductService,
    private readonly subCategoryService: SubCategoryService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.category = params['category'];
      this.fetchProductsByCategory(this.category);
      this.fetchSubCategoriesByCategory(this.category);
    });
    this.fetchSizes();
    this.fetchColors();
  }

  onSelectedSubCategory(subCategory: string) {
    this.selectedSubCategory = subCategory;
    this.filteredProduct();
  }

  onChangeMaxPrice(max: number) {
    this.maxPrice = max;
    this.filteredProduct();
  }

  onChangeMinPrice(min: number) {
    this.minPrice = min;
    this.filteredProduct();
  }

  onSelectedSize(size: string) {
    this.selectedSize = size;
    this.filteredProduct();
  }

  onSelectedColor(color: string) {
    this.selectColor = color;
    this.filteredProduct();
  }

  fetchProductsByCategory(category: string) {
    this.isLoading = true;
    this.productsService
      .getProductsByCategory(category)
      .subscribe((response) => {
        this.products = response.data;
        this.isLoading = false;
      });
  }

  async fetchSubCategoriesByCategory(category: string) {
    this.subCategoryService
      .getSubCategoriesByCategory(category)
      .subscribe((response: IApiResponse) => {
        this.subCategories = response.data;
      });
  }

  async fetchSizes() {
    this.sizeService.getSizes().subscribe((sizes) => {
      this.sizes = sizes;
    });
  }

  async fetchColors() {
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
    });
  }

  async filteredProduct() {
    this.productsService
      .getFilteredProducts(
        this.category,
        this.selectedSubCategory,
        this.selectedSize,
        this.minPrice,
        this.maxPrice,
        this.selectColor,
      )
      .subscribe((products) => {
        console.log(products);

        this.products = products;
        this.currentPage = 1;
      });
  }

  onAddWishlist(productCode: string): void {
    // this.authService.checkSession().subscribe((response) => {
    //   if (response.data.authenticate) {
    //     return this.wishlistService
    //       .addProduct(productCode)
    //       .subscribe((response) => {
    //         this.toast.success(response.message);
    //       });
    //   }
    //   return this.redirectToLogin();
    // });
  }

  onAdd(productCode: string) {
    // this.authService.checkSession().subscribe((response) => {
    //   if (response.data.authenticate) {
    //     return this.cartService
    //       .addProductToCart({ productCode: productCode, quantity: 1 })
    //       .subscribe((response) => {
    //         this.toast.success(response.message);
    //       });
    //   }
    //   return this.redirectToLogin();
    // });
  }

  redirectToProductDetail(productCode: string) {
    this.router.navigate(['/products/detail', productCode]);
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}
