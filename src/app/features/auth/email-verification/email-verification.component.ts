import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmailComponent } from "../forms/form-email/form-email.component";
import { SuccessViewComponent } from "../../../shared/success-view/success-view.component";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'email-verification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormEmailComponent,
    SuccessViewComponent
],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent  {
  step = signal<'email' | 'success'>('email');
  @Output() onCancel = new EventEmitter<void>();

  constructor() {}



}
