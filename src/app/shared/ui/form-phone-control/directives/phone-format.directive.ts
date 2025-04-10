import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[phoneFormat]',
  standalone: true,
})
export class PhoneFormatDirective {
  constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    let value = this.el.nativeElement.value.replace(/\D/g, ''); 

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    value = value.replace(/(\d{3})(?=\d)/g, '$1 ').trim();

    this.el.nativeElement.value = value;
  }

}