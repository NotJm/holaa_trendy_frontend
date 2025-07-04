import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProduct } from "../../../../core/interfaces/product.interface";
import { IconControlComponent } from "../../../../shared/ui/controls/icon-control/icon-control.component";

@Component({
  selector: 'search-item',
  standalone: true,
  imports: [CommonModule, IconControlComponent],
  templateUrl: 'search-item.component.html',
})
export class SearchItemComponent {
  @Input({ required: true }) product!: IProduct;

  @Output() onHoverEvent = new EventEmitter<any>();
  @Output() onLeaveEvent = new EventEmitter<any>();
  @Output() onBlurEvent = new EventEmitter<void>();
  @Output() onProductEvent = new EventEmitter<IProduct>();

}