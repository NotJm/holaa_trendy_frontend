import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { Color } from '../../../core/interfaces/color.interface';
import { Product } from '../../../core/interfaces/products.interface';
import { Size } from '../../../core/interfaces/size.interface';
import { SubCategory } from '../../../core/interfaces/sub-category.interface';
import { AuthService } from '../../../core/providers/api/auth.service';
import { CartService } from '../../../core/providers/api/cart.service';
import { ColorService } from '../../../core/providers/api/color.service';
import { ProductsService } from '../../../core/providers/api/products.service';
import { SizeService } from '../../../core/providers/api/size.service';
import { SubCategoryService } from '../../../core/providers/api/sub-category.service';
import { WishlistService } from '../../../core/providers/api/wishlist.service';
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
  products: Product[] = [];
  subCategories: SubCategory[] = [];
  sizes: Size[] = [];
  colors: Color[] = [];

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
    private readonly authService: AuthService,
    private readonly toast: HotToastService,
    private readonly productsService: ProductsService,
    private readonly subCategoryService: SubCategoryService,
    private readonly cartService: CartService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
    private readonly wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProductsByCategory(this.category);
      this.loadSubCategoriesByCategory(this.category);
    });
    this.loadSizes();
    this.loadColors();
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

  loadProductsByCategory(category: string) {
    this.isLoading = true;
    this.productsService
      .getProductsByCategory(category)
      .subscribe((response) => {
        this.products = response.data;
        this.isLoading = false;
      });
  }

  async loadSubCategoriesByCategory(category: string) {
    this.subCategoryService
      .getSubCategoriesByCategory(category)
      .subscribe((subCategories) => {
        this.subCategories = subCategories;
      });
  }

  async loadSizes() {
    this.sizeService.getSizes().subscribe((sizes) => {
      this.sizes = sizes;
    });
  }

  async loadColors() {
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
