import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, Subject } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { ICategory } from '../../../core/interfaces/categories.interface';
import { IProduct } from '../../../core/interfaces/product.interface';
import { CategoryService } from '../../../core/providers/api/category.service';
import { ProductService } from '../../../core/providers/api/products.service';
@Component({
  selector: 'app-crud-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-products.component.html',
  styleUrl: './crud-products.component.css',
})
export class CrudProductsComponent implements OnInit, OnDestroy {
  // Signals
  isModalOpen = signal<boolean>(false);
  isDeleteModalOpen = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // Compute
  totalProducts = computed(() => this.products().length);

  // Behaviors & Subject
  #destroy$ = new Subject<void>();

  // Data
  products = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);

  searchTerm = '';
  selectedCategory = '';
  editingProduct: IProduct | null = null;
  productToDelete: IProduct | null = null;

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  fetchProducts(): void {
    this.productService
      .getProducts()
      .pipe(finalize(() => this.isLoading.set(true)))
      .subscribe({
        next: (response: IApiResponse) => this.products.set(response.data),
      });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: IApiResponse) => this.categories.set(response.data),
    });
  }

  onOpenModal(product?: IProduct, deleteMode?: boolean): void {
    if (product) this.editingProduct = product;
    this.isModalOpen.set(true);
  }

  onCloseModal(deleteMode?: boolean): void {
    this.isModalOpen.set(false);
    this.editingProduct = null;
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

  getSizeStockClass(stock: number): string {
    if (stock === 0) return 'text-red-500';
    if (stock <= 2) return 'text-yellow-600';
    return 'text-green-600';
  }

  // openDeleteModal(product: Product) {
  //   this.productToDelete = product
  //   this.isDeleteModalOpen.set(true)
  // }

  // closeDeleteModal() {
  //   this.isDeleteModalOpen.set(false)
  //   this.productToDelete = null
  // }

  // // Image management
  // addImage() {
  //   if (this.formData.images!.length < 8) {
  //     const newImageUrl = prompt("Ingresa la URL de la imagen:")
  //     if (newImageUrl) {
  //       this.formData.images = [...(this.formData.images || []), newImageUrl]
  //       if (this.formData.images.length === 1) {
  //         this.formData.imgUri = newImageUrl
  //       }
  //     }
  //   }
  // }

  // removeImage(index: number) {
  //   this.formData.images = this.formData.images?.filter((_, i) => i !== index) || []
  //   if (this.formData.images.length > 0) {
  //     this.formData.imgUri = this.formData.images[0]
  //   } else {
  //     this.formData.imgUri = ""
  //   }
  // }

  // updateImageUrl(index: number, event: any) {
  //   const newUrl = event.target.value
  //   if (this.formData.images) {
  //     this.formData.images[index] = newUrl
  //     if (index === 0) {
  //       this.formData.imgUri = newUrl
  //     }
  //   }
  // }

  // getEmptySlots() {
  //   const currentImages = this.formData.images?.length || 0
  //   return Array(Math.max(0, 8 - currentImages)).fill(null)
  // }

  // // Size and stock management
  // isSizeSelected(size: string): boolean {
  //   return this.formData.sizesNames?.includes(size) || false
  // }

  // toggleSize(size: string) {
  //   if (!this.formData.sizesNames) this.formData.sizesNames = []
  //   if (!this.formData.sizeStock) this.formData.sizeStock = []

  //   if (this.isSizeSelected(size)) {
  //     // Remove size
  //     this.formData.sizesNames = this.formData.sizesNames.filter((s) => s !== size)
  //     this.formData.sizeStock = this.formData.sizeStock.filter((item) => item.size !== size)
  //   } else {
  //     // Add size
  //     this.formData.sizesNames.push(size)
  //     this.formData.sizeStock.push({ size, stock: 0 })
  //   }
  //   this.updateTotalStock()
  // }

  // getSizeStock(size: string): number {
  //   return this.formData.sizeStock?.find((item) => item.size === size)?.stock || 0
  // }

  // updateSizeStock(size: string, event: any) {
  //   const stock = Number.parseInt(event.target.value) || 0
  //   if (this.formData.sizeStock) {
  //     const sizeItem = this.formData.sizeStock.find((item) => item.size === size)
  //     if (sizeItem) {
  //       sizeItem.stock = stock
  //     }
  //   }
  //   this.updateTotalStock()
  // }

  // getTotalStock(): number {
  //   return this.formData.sizeStock?.reduce((total, item) => total + item.stock, 0) || 0
  // }

  // updateTotalStock() {
  //   this.formData.stock = this.getTotalStock()
  // }

  // // Color management
  // isColorSelected(color: string): boolean {
  //   return this.formData.colorsNames?.includes(color) || false
  // }

  // toggleColor(color: string) {
  //   if (!this.formData.colorsNames) this.formData.colorsNames = []

  //   if (this.isColorSelected(color)) {
  //     this.formData.colorsNames = this.formData.colorsNames.filter((c) => c !== color)
  //   } else {
  //     this.formData.colorsNames.push(color)
  //   }
  // }

  // // Price calculation
  // calculateFinalPrice() {
  //   const price = this.formData.price || 0
  //   const discount = this.formData.discount || 0
  //   this.formData.finalPrice = price * (1 - discount / 100)
  // }

  // // CRUD operations
  // saveProduct() {
  //   this.isLoading.set(true)

  //   // Ensure imgUri is set to first image
  //   if (this.formData.images && this.formData.images.length > 0) {
  //     this.formData.imgUri = this.formData.images[0]
  //   }

  //   setTimeout(() => {
  //     if (this.editingProduct) {
  //       // Update existing product
  //       const index = this.products.findIndex((p) => p.code === this.editingProduct!.code)
  //       if (index !== -1) {
  //         this.products[index] = { ...this.formData } as Product
  //       }
  //     } else {
  //       // Create new product
  //       this.products.push({ ...this.formData } as Product)
  //     }

  //     this.isLoading.set(false)
  //     this.closeModal()
  //   }, 2000)
  // }

  // deleteProduct() {
  //   if (!this.productToDelete) return

  //   this.isLoading.set(true)
  //   setTimeout(() => {
  //     this.products = this.products.filter((p) => p.code !== this.productToDelete!.code)
  //     this.isLoading.set(false)
  //     this.closeDeleteModal()
  //   }, 1000)
  // }

  // // Utility methods
  // getSizeStockClass(stock: number): string {
  //   if (stock === 0) return "text-red-500"
  //   if (stock <= 2) return "text-yellow-600"
  //   return "text-green-600"
  // }

  // get filteredProducts() {
  //   return this.products.filter((product) => {
  //     const matchesSearch =
  //       product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //       product.code.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     const matchesCategory = !this.selectedCategory || product.categoryName === this.selectedCategory
  //     return matchesSearch && matchesCategory
  //   })
  // }

  // get categories() {
  //   return [...new Set(this.products.map((p) => p.categoryName))]
  // }

  // get totalProducts() {
  //   return this.products.length
  // }

  // get inStockProducts() {
  //   return this.products.filter((p) => p.stock > 0).length
  // }

  // get lowStockProducts() {
  //   return this.products.filter((p) => p.stock > 0 && p.stock <= 10).length
  // }

  // get outOfStockProducts() {
  //   return this.products.filter((p) => p.stock === 0).length
  // }
}
