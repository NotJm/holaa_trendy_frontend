import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UnpicImageDirective } from '@unpic/angular';

@Component({
  selector: 'image-control',
  standalone: true,
  imports: [UnpicImageDirective, CommonModule, RouterLink],
  templateUrl: './image-control.component.html'
})
export class ImageControlComponent {
  @Input({ required: true }) src: string | null = '';
  @Input({ required: true }) alt: string = '';
  @Input({ required: true }) imageClass: string = '';
  @Input() isImageLink: boolean = false;
  @Input() imageLinkClass: string = ''
  @Input() imageLink: string = '';
}
