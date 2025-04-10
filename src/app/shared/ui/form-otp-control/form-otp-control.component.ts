import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { OnlyOtpDirective } from './directive/only-otp.directive';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpFocusNextDirective } from './directive/otp-focus-nest.directive';

@Component({
  selector: 'form-otp-control',
  standalone: true,
  imports: [
    CommonModule,
    OtpFocusNextDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-otp-control.component.html',
})
export class FormOtpControlComponent implements AfterViewInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  @Input({ required: true }) form!: FormGroup;
  @Output() inputEvent = new EventEmitter<{ event: Event; index: number }>();
  @Output() keyDownEvent = new EventEmitter<{
    event: KeyboardEvent;
    index: number;
  }>();

  otpInputsElements: ElementRef[] = [];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.otpInputsElements = this.otpInputs.toArray();
    this.cdr.detectChanges();
  }

  onInput(event: Event, index: number) {
    this.inputEvent.emit({ event, index });
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    this.keyDownEvent.emit({ event, index });
  }
}
