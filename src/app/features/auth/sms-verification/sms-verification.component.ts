import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormPhoneComponent } from '../forms/form-phone/form-phone.component';
import { FormOtpComponent } from '../forms/form-otp/form-otp.component';
import { SuccessViewComponent } from '../../../shared/success-view/success-view.component';

@Component({
  selector: 'sms-verification',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormPhoneComponent,
    FormOtpComponent,
    SuccessViewComponent
],
  templateUrl: './sms-verification.component.html',
  styleUrl: './sms-verification.component.css',
})
export class SmsVerficationComponent {
  @Input() step: 'phone' | 'otp' | 'success' = 'phone';
  @Input() enable: boolean = true;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onNextStep = new EventEmitter<void>();

  phoneNumber = signal<string>('');


}
