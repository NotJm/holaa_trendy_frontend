import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ILowStockProduct } from "../../core/interfaces/product.interface";

@Component({ 
  selector: 'low-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './low-stock-list.component.html'
})
export class LowStockListComponent {
  @Input({ required: true }) lowStockProducts: ILowStockProduct[] = []; 
}