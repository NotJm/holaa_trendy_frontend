import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { FileControlComponent } from '../../../../shared/ui/controls/file-control/file-control.component';
import { ImageControlComponent } from '../../../../shared/ui/controls/image-control/image-control.component';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [
    CommonModule,
    ImageControlComponent,
    ButtonControlComponent,
    FileControlComponent,
  ],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @Input() images: string[] = [];

  @Output() setImgMainEvent = new EventEmitter<{
    imgUri: string;
    index: number;
  }>();
  @Output() removeImgUriEvent = new EventEmitter<number>();
  @Output() imagesChangeEvent = new EventEmitter<string[]>();
}
