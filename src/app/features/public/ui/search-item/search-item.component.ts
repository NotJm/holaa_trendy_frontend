import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../../../../core/interfaces/products.interface";
import { CommonModule } from "@angular/common";
import { IconControlComponent } from "../../../../shared/ui/controls/icon-control/icon-control.component";

@Component({
  selector: 'search-item',
  standalone: true,
  imports: [CommonModule, IconControlComponent],
  templateUrl: 'search-item.component.html',
})
export class SearchItemComponent {
  @Input({ required: true }) product!: Product;

  @Output() onHoverEvent = new EventEmitter<any>();
  @Output() onLeaveEvent = new EventEmitter<any>();
  @Output() onBlurEvent = new EventEmitter<void>();
  @Output() onProductEvent = new EventEmitter<Product>();

}