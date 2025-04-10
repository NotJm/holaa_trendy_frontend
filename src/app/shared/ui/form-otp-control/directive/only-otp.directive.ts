import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[onlyOtp]',
  standalone: true,
})
export class OnlyOtpDirective {

  constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    let value = this.el.nativeElement.value;

    value = value.replace(/\D/g, '');

    this.el.nativeElement.value = value;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      ['Backspace', 'Tab', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }


  }

}
