import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'select-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <div class="mb-4">
    <h4 class="text-sm font-medium mb-2">{{titleSelect}}</h4>
    <select
      [(ngModel)]="itemSelected"
      (change)="onSelected()"
      class="w-full border rounded-sm px-3 py-2 text-sm"
      [ariaLabel]="titleSelect"
    >
      <option *ngIf="hasDefaultValue && !isDefaultValueInItems()" [value]="defaultValue">{{defaultLabel}}</option>
      @for(item of items; track getItemId(item)) {
      <option [value]="getItemValue(item)">{{ getItemValue(item) | titlecase }}</option>
      }
    </select>
  </div>`,
})
export class SelectControlComponent<T extends Record<string, any>> implements OnInit {
  @Input({ required: true }) titleSelect!: string;
  @Input({ required: true }) hasDefaultValue!: boolean;
  @Input() defaultValue: string | null = '';
  @Input() defaultLabel: string | null = '';
  @Input({ required: true }) items!: T[];
  @Input({ required: true }) idKey!: keyof T;
  @Input({ required: true }) valueKey!: keyof T;
  @Output() onItemSelected = new EventEmitter<string>();
  itemSelected: string = ''

  ngOnInit(): void {
    this.itemSelected = this.defaultValue || '';
  }

  isDefaultValueInItems(): boolean {
    return this.items.some(item => this.getItemValue(item) === this.defaultValue);
  }

  onSelected(): void {
    return this.onItemSelected.emit(this.itemSelected);
  }

  getItemId(item: T): string | number {
    return item[this.idKey] as string | number;
  }

  getItemValue(item: T): string {
    return String(item[this.valueKey])
  }
}
