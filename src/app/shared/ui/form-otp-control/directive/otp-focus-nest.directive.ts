import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[otpFocusNext]',
  standalone: true,
})
export class OtpFocusNextDirective {
  @Input() index!: number;
  @Input() inputs!: ElementRef[];

  constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && !/^\d$/.test(value)) {
      input.value = '';
    }

    if (value && this.index < this.inputs.length - 1) {
      this.inputs[this.index + 1].nativeElement.focus();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'Backspace' &&
      !this.el.nativeElement.value &&
      this.index > 0
    ) {
      this.inputs[this.index - 1].nativeElement.focus();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const otpNumber = pastedData.replace(/\D/g, '').split('');

    otpNumber.map((num, i) => {
      if (this.inputs[i]) {
        this.inputs[i].nativeElement.value = num;
      }
    });

    this.inputs[
      Math.min(otpNumber.length, this.inputs.length)
    ]?.nativeElement.focus();
  }
}
