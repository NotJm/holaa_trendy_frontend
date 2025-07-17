import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { IconControlComponent } from '../../../../shared/ui/controls/icon-control/icon-control.component';
import { InputControlComponent } from '../../../../shared/ui/controls/input-control/input-control.component';
import { TextAreaControlComponent } from '../../../../shared/ui/controls/textarea-control/textarea-control.component';
import {
  IProduct,
  IVariant,
} from '../../../../core/interfaces/product.interface';
import { FileControlComponent } from '../../../../shared/ui/controls/file-control/file-control.component';
import { GalleryComponent } from '../gallery/gallery.components';
import { SelectControlComponent } from '../../../../shared/ui/controls/select-control/select-control.component';
import { IColor } from '../../../../core/interfaces/color.interface';
import { ISubCategory } from '../../../../core/interfaces/sub-category.interface';
import { NoDataComponent } from '../../../../shared/no-data/no-data.component';
import { ISize } from '../../../../core/interfaces/size.interface';

@Component({
  selector: 'crud-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconControlComponent,
    ButtonControlComponent,
    InputControlComponent,
    TextAreaControlComponent,
    FileControlComponent,
    GalleryComponent,
    SelectControlComponent,
    NoDataComponent,
  ],
  templateUrl: './crud-modal.component.html',
})
export class CrudModalComponent implements OnInit {
  @Input() mode: 'edit' | 'create' = 'create';
  @Input() show: boolean = false;
  @Input() product: IProduct = {} as IProduct;
  @Input() colors: IColor[] = [];
  @Input() subCategories: ISubCategory[] = [];
  @Input() sizes: ISize[] = [];

  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<IProduct>();

  constructor(private readonly fb: FormBuilder) {}

  public ngOnInit(): void {}

  public get calculateFinalPrice(): number {
    const basePrice = this.product.price || 0;
    const discount = this.product.discount || 0;

    const final = basePrice - basePrice * (discount / 100);

    return final;
  }

  public updateFinalPrice(): void {
    this.product.finalPrice = this.calculateFinalPrice;
  }

  public onSetImageMain(imgUri: string, index: number): void {
    console.log(imgUri);

    this.product.imgUri
      ? this.product.images.splice(index, 1, this.product.imgUri)
      : this.product.images.splice(index, 1);

    this.product.imgUri = imgUri;
  }

  public onRemoveImage(index: number): void {
    this.product.images.splice(index, 1);
  }

  public onAddSubCategory(): void {
    this.product.subCategoriesNames.push('Seleecione una sub categoria');
  }

  public onRemoveSubCategory(index: number): void {
    this.product.subCategoriesNames.splice(index, 1);
  }

  public getAvailableSubcategories(currentIndex: number): string[] {
    const selectedExceptCurrent = this.product.subCategoriesNames.filter(
      (_, i) => i !== currentIndex
    );
    return this.subCategories
      .map((sub) => sub.name)
      .filter((name) => !selectedExceptCurrent.includes(name));
  }

  public onAddVariant(): void {
    this.product.variants.push({
      sizeName: '',
      stock: 1,
      isNew: true,
    });
  }

  public onRemoveVariant(index: number): void {
    this.product.variants.slice(index, 1);
  }

  public getAvailableSizes(currentVariant: IVariant): ISize[] {
    const selectedSizes = this.product.variants
      .filter((variant) => variant !== currentVariant)
      .map((variant) => variant.sizeName);

    return this.sizes.filter((size) => !selectedSizes.includes(size.name));
  }

  public noMoreAvailableSizes(): boolean {
    const selectedSizes = this.product.variants.map(
      (variant) => variant.sizeName
    );
    return this.sizes.every((size) => selectedSizes.includes(size.name));
  }

  public onSizeSelected(sizeName: string, variant: IVariant): void {
    variant.sizeName = sizeName;
  }

  public isExistingVariant(index: number): boolean {
    return !this.product.variants[index].isNew;
  }

  public onSave(): void {
    this.saveEvent.emit(this.product);

    this.closeEvent.emit();
  }
}
