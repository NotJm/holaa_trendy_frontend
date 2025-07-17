import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { delay, finalize, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { ICategory } from '../../../core/interfaces/categories.interface';
import { IColor } from '../../../core/interfaces/color.interface';
import { IProduct, IVariant } from '../../../core/interfaces/product.interface';
import { ISize } from '../../../core/interfaces/size.interface';
import { ISubCategory } from '../../../core/interfaces/sub-category.interface';
import { CategoryService } from '../../../core/providers/api/category.service';
import { ColorService } from '../../../core/providers/api/color.service';
import { ProductService } from '../../../core/providers/api/products.service';
import { SizeService } from '../../../core/providers/api/size.service';
import { SubCategoryService } from '../../../core/providers/api/sub-category.service';
import { CloudinaryService } from '../../../core/providers/cloudinary.service';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { InputControlComponent } from '../../../shared/ui/controls/input-control/input-control.component';
import { TableProductComponent } from '../ui/table-control/table-product.component';
import { StateCardComponent } from '../ui/state-cards/state-cards.component';
import { CrudModalComponent } from '../ui/crud-modal/crud-modal.component';
import { HotToastService } from '@ngxpert/hot-toast';
@Component({
  selector: 'app-crud-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonControlComponent,
    InputControlComponent,
    TableProductComponent,
    StateCardComponent,
    CrudModalComponent,
  ],
  templateUrl: './crud-products.component.html',
})
export class CrudProductsComponent implements OnInit, OnDestroy {
  // Signals
  showModal = signal<boolean>(false);
  modeModal = signal<'edit' | 'create'>('create');
  isEditMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isUploading = signal<boolean>(false);

  // Behaviors & Subject
  #destroy$ = new Subject<void>();

  // Data
  products: IProduct[] = [];
  subCategoriesNames: string[] = [];
  existingSizeNames = new Set<string>();

  subCategories: ISubCategory[] = [];
  categories: ICategory[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];

  // Form
  productForm!: FormGroup;

  // For filtering
  searchTerm: string = '';
  categorySelected: string = 'all';

  // Edit mode
  editingProductCode: string | null = null;
  productSelected: IProduct = {} as IProduct;

  // For controlling images
  mainImage: string | null = null;
  currentMainImageUrl: string | null = null;
  currentAditionalImages: string[] = [];
  newAdditionalImages: string[] = [];
  additionalImages: string[] = [];
  imageLoadingStates: Record<string, boolean> = {};

  // For searching elements in section
  @ViewChild('mainImageInput') mainImageInput!: ElementRef;
  @ViewChild('additionalImagesInput') additionalImagesInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private readonly colorService: ColorService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly subCategoryService: SubCategoryService,
    private readonly sizesService: SizeService,
    private readonly toastService: HotToastService
  ) {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgUri: ['', Validators.required],
      images: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1), Validators.maxLength(8)]
      ),
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      finalPrice: [0, [Validators.required, Validators.min(0)]],
      categoryName: ['', Validators.required],
      colorName: ['', Validators.required],
      subCategoriesNames: this.fb.array([], Validators.required),
      variants: this.fb.array([]),
    });
  }

  public ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchColors();
    this.fetchSizes();
  }

  public ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private fetchProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => (this.products = response.data),
      });
  }

  private fetchCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => (this.categories = response.data),
      });
  }

  private fetchColors(): void {
    this.colorService
      .getColors()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (colors: IColor[]) => (this.colors = colors),
      });
  }

  private fetchSizes(): void {
    this.sizesService
      .getSizes()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (sizes: ISize[]) => (this.sizes = sizes),
      });
  }

  private async fetchSubCategoriesByCategory(
    categoryName: string
  ): Promise<void> {
    const response = await firstValueFrom(
      this.subCategoryService.getSubCategoriesByCategory(categoryName)
    );

    this.subCategories = response.data;
  }

  public get variantsFormArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  public get imagesFormArray(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  public get subCategoriesNamesFormArray(): FormArray {
    return this.productForm.get('subCategoriesNames') as FormArray;
  }

  public async uploadImages(file: string): Promise<string> {
    try {
      this.isUploading.set(true);

      const response = await firstValueFrom(
        this.cloudinaryService.uploadImage(file).pipe(
          takeUntil(this.#destroy$),
          finalize(() => this.isUploading.set(false))
        )
      );
      return response.secure_url;
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary', error);
      return '';
    }
  }

  public openCreateModal(): void {
    document.body.classList.add('overflow-hidden');
    this.isEditMode.set(false);
    this.editingProductCode = null;
    this.productForm.reset();
    this.variantsFormArray.clear();
    // this.addVariant();
    this.showModal.set(true);
  }

  public onCloseModal(): void {
    document.body.classList.remove('overflow-hidden');
    this.showModal.set(false);
    this.productForm.reset();
    this.productSelected = {} as IProduct;
    this.variantsFormArray.clear();
    this.imagesFormArray.clear();
    this.subCategoriesNamesFormArray.clear();
  }

  public async editProduct(product: IProduct): Promise<void> {
    await this.fetchSubCategoriesByCategory(product.categoryName);

    document.body.classList.add('overflow-hidden');

    this.productSelected = product;

    this.modeModal.set('edit');

    this.showModal.set(true);
  }

  private patchValues(product: IProduct): void {
    this.productForm.patchValue({
      code: product.code,
      name: product.name,
      description: product.description,
      imgUri: product.imgUri,
      price: product.price,
      discount: product.discount,
      finalPrice: product.finalPrice,
      categoryName: product.categoryName,
      colorName: product.color.name,
      colorHex: product.color.hexCode,
    });

    this.variantsFormArray.clear();

    this.imagesFormArray.clear();

    this.subCategoriesNamesFormArray.clear();

    this.setVariants(product.variants);

    this.setImages(product.images);

    this.setSubCategoriesNames(product.subCategoriesNames);
  }

  private setImages(images: string[]): void {
    images.forEach((img) =>
      this.imagesFormArray.push(this.fb.control(img, Validators.required))
    );
  }

  private setSubCategoriesNames(subCategoriesNames: string[]): void {
    subCategoriesNames.forEach((name) =>
      this.subCategoriesNamesFormArray.push(
        this.fb.control(name, Validators.required)
      )
    );
  }

  private setVariants(variants: IVariant[]): void {
    this.variantsFormArray.clear();

    variants.forEach((variant) => {
      this.variantsFormArray.push(
        this.fb.group({
          sizeName: [variant.sizeName, Validators.required],
          stock: [variant.stock, [Validators.required, Validators.min(0)]],
        })
      );
      this.existingSizeNames.add(variant.sizeName);
    });
  }

  public onSubmit(product: IProduct): void {
    this.patchValues(product);

    if (this.productForm.invalid) return;

    if (this.modeModal() == 'edit') return this.updateProduct(product);

    return this.createProduct(product);
  }

  public updateProduct(product: IProduct): void {
    const productVariant: IVariant[] = this.productForm.value.variants.map(
      (variant: any) => ({
        ...variant,
        stock: +variant.stock,
      })
    );

    const productEdited = {
      ...this.productForm.value,
      variants: productVariant,
      price: +this.productForm.value.price,
      discount: +this.productForm.value.discount,
      finalPrice: +this.productForm.value.finalPrice,
    } as IProduct;

    this.productService
      .updateProduct(productEdited)
      .pipe(delay(1000), takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => {
          this.toastService.success(response.message, {
            position: 'top-right',
          });
          this.fetchProducts();
        },
        error: (error) => console.error(error),
      });
  }

  public createProduct(product: IProduct): void {
    const productVariant: IVariant[] = this.productForm.value.variants.map(
      (variant: any) => ({
        ...variant,
        stock: +variant.stock,
      })
    );

    const productEdited = {
      ...this.productForm.value,
      variants: productVariant,
      price: +this.productForm.value.price,
      discount: +this.productForm.value.discount,
      finalPrice: +this.productForm.value.finalPrice,
    } as IProduct;

    this.productService
      .createProduct(productEdited)
      .pipe(delay(1000), takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => {
          this.toastService.success(response.message, {
            position: 'top-right',
          });
          this.fetchProducts();
        },
        error: (error) => console.error(error),
      });
  }

  public deleteProduct(productCode: string): void {}

  public getTotalStock(variants: IVariant[]): number {
    return variants.reduce((total, variant) => total + variant.stock, 0);
  }

  public getProductsWithDiscount(): number {
    return this.products.filter((p) => p.discount > 0).length;
  }

  public getOutOfStockProducts(): number {
    return this.products.filter((p) => this.getTotalStock(p.variants) === 0)
      .length;
  }

  public getLowStockProducts(): number {
    return this.products.filter((p) => {
      const total = this.getTotalStock(p.variants);
      return total > 0 && total < 10;
    }).length;
  }
}
