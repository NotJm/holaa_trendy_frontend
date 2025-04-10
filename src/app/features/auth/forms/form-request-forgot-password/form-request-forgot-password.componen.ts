import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonControlComponent } from "../../../../shared/ui/button/button-control.component";
import { IconControlComponent } from "../../../../shared/ui/controls/icon-control/icon-control.component";
import { NavigationLinkComponent } from "../../../../shared/ui/navigation-link/navigation-link.component";
@Component({
  selector: 'form-request-forgot-password',
  templateUrl: './form-request-forgot-password.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonControlComponent,
    NavigationLinkComponent,
    IconControlComponent
],
})
export class FormRequestForgotPasswordComponent {
  @Output() onNextStep = new EventEmitter<void>();

  
}