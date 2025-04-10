import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { eachDayOfInterval, endOfYear, format, startOfYear } from 'date-fns';
import { SelectControlComponent } from "../select-control/select-control.component";

@Component({
  selector: 'date-range',
  standalone: true,
  template: `<div class="space-y-4">
    <!-- Fecha de inicio -->
    <select-control
      titleSelect="Fecha de inicio"
      [hasDefaultValue]="true"
      [defaultValue]="startDate"
      [items]="availableDates"
      idKey="id"
      valueKey="value"
      (onItemSelected)="onStartDateSelected.emit($event)"
    ></select-control>

    <!-- Fecha de fin -->
    <select-control
      titleSelect="Fecha de fin"
      [hasDefaultValue]="true"
      [defaultValue]="endDate"
      [items]="availableDates"
      idKey="id"
      valueKey="value"
      (onItemSelected)="onEndDateSelected.emit($event)"
    ></select-control>
  </div> `,
  imports: [SelectControlComponent],
})
export class DateRangeComponent implements OnInit {
  @Output() onStartDateSelected = new EventEmitter<string>();
  @Output() onEndDateSelected = new EventEmitter<string>();

  availableDates: { id: string; value: string }[] = [];
  startDate: string = '';
  endDate: string = '';

  ngOnInit(): void {
    this.generateAvailable();
  }

  private generateAvailable(): void {
    const startOfYearDate = startOfYear(new Date());
    const endOfYearDate = endOfYear(new Date());

    const daysInYear = eachDayOfInterval({
      start: startOfYearDate,
      end: endOfYearDate,
    });

    this.availableDates = daysInYear.map((date, index) => ({
      id: index.toString(),
      value: format(date, 'dd/MM/yyyy'),
    }));
  }
}
