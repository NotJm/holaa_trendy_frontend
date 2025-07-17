import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IconControlComponent } from '../icon-control/icon-control.component';
import { ButtonControlComponent } from '../../button/button-control.component';
import { CommonModule } from '@angular/common';
import { ImageControlComponent } from '../image-control/image-control.component';

@Component({
  selector: 'file-control',
  standalone: true,
  imports: [
    CommonModule,
    IconControlComponent,
    ButtonControlComponent,
    ImageControlComponent,
  ],
  templateUrl: './file-control.component.html',
})
export class FileControlComponent {
  @Input() imgUri: string = '';
  @Input() simpleMode: boolean = false;

  @Output() imageUriEvent = new EventEmitter<string>();

  @ViewChild('imageInput') mainImageInput!: ElementRef;

  private maximum: number = 5 * 1024 * 1024;

  public onTriggerUploadImage(): void {
    const input = document.querySelector('#mainImageInput') as HTMLInputElement;
    input?.click();
  }

  public onRemoveImage(): void {
    this.imgUri = '';
    this.imageUriEvent.emit('');
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add('border-gray-400');
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add('border-gray-400');
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add('border-gray-400');

    const files = event.dataTransfer?.files;

    if (!files) return;

    if (files.length < 0) return;

    this.processImageFile(files[0], (result) => {
      this.imgUri = result;
      this.imageUriEvent.emit(result);
    });
  }

  public onImageSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    this.processImageFile(file, (result) => {
      this.imgUri = result;
      this.imageUriEvent.emit(result);
    });
  }

  private processImageFile(
    input: File | string,
    callback: (result: string) => void
  ) {
    if (typeof input === 'string') {
      return callback(input);
    }

    if (!input.type.startsWith('image/')) {
      alert('Por favor selecciona solo archivos de imagen');
      return;
    }

    if (input.size > this.maximum) {
      alert('El archivo es demasiado grande. Máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => callback(e.target?.result as string);
    reader.readAsDataURL(input);
  }
}
