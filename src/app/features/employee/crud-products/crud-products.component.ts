import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { ICategory } from '../../../core/interfaces/categories.interface';
import { IProduct } from '../../../core/interfaces/products.interface';
import { CategoryService } from '../../../core/providers/api/category.service';
import { ProductsService } from '../../../core/providers/api/products.service';
import { InputControlComponent } from '../../../shared/ui/controls/input-control/input-control.component';
import { FormTextAreaControlComponent } from "../../../shared/ui/form-text-area-control/form-text-area-control.component";

@Component({
  selector: 'app-crud-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputControlComponent,
    FormTextAreaControlComponent
],
  templateUrl: './crud-products.component.html',
  styleUrl: './crud-products.component.css',
})
export class CrudProductsComponent implements OnInit, OnDestroy {
  // Signals para el estado visual
  isModalOpen = signal<boolean>(false);
  isDeleteModalOpen = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  searchTerm = '';
  selectedCategory: string = '';
  editingProduct: IProduct | null = null;
  productToDelete: IProduct | null = null;

  editMode = signal<boolean>(false);

  products = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);

  productForm: FormGroup;

  #destroy$ = new Subject<void>();

  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoryService,
    private readonly fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      imgUri: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [
        0,
        [Validators.required, Validators.pattern('^[0-9]*(.[0-9]*)?$')],
      ],
      discount: [
        0,
        [Validators.required, Validators.pattern('^[0-9]*(.[0-9]*)?$')],
      ],
      stock: [0, [Validators.required, Validators.min(1)]],
      categoryName: ['', [Validators.required]],
      subCategoryName: ['', [Validators.required]],
      colorsNames: ['', [Validators.required]],
      sizesNames: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  /**
   * Handles the logic for terminating the observables subscription
   */
  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  /**
   * Handles the logic for getting the product's data
   */
  private fetchProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.#destroy$))
      .subscribe((products: IApiResponse) => {
        this.products.set(products.data);
      });
  }

  /**
   * Handles the logic for getting the categorie's data
   */
  private fetchCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.#destroy$))
      .subscribe((categories: IApiResponse) => {
        this.categories.set(categories.data);
      });
  }

  private createProduct(newProduct: IProduct): void {}

  private updateProduct(editedProduct: IProduct): void {
    console.log(editedProduct);
    // this.productService.updateProduct(editedProduct).subscribe();
  }

  // Métodos para el diseño
  openCreateModal() {
    this.editingProduct = null;
    this.isModalOpen.set(true);
  }

  openEditModal(product: IProduct) {
    this.productForm.patchValue(product);
    this.editMode.set(true);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.productForm.reset();
    this.editMode.set(true);
    this.isModalOpen.set(false);
  }

  openDeleteModal(product: IProduct) {
    this.productToDelete = product;
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.productToDelete = null;
  }

  saveProduct(): void {
    if (!this.editingProduct) return;

    this.isLoading.set(true);

    setTimeout(() => {
      this.updateProduct(this.editingProduct as IProduct);
      this.isLoading.set(false);
      this.closeModal();
    }, 2000);
  }

  deleteProduct() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.closeDeleteModal();
    }, 1000);
  }

  get filteredProducts() {
    return this.products().filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.selectedCategory ||
        product.categoryName === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  get totalProducts() {
    return this.products().length;
  }

  get inStockProducts() {
    return this.products().filter((p) => p.stock > 0).length;
  }

  get lowStockProducts() {
    return this.products().filter((p) => p.stock > 0 && p.stock <= 10).length;
  }

  get outOfStockProducts() {
    return this.products().filter((p) => p.stock === 0).length;
  }
}
