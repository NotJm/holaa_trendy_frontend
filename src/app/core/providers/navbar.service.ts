import { effect, ElementRef, Injectable, signal, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarService {
  @ViewChildren('navbar') navbarElement!: ElementRef;

  visible = signal<boolean>(true);

  hide(): void {
    this.visible.set(false);
  }

  show(): void {
    this.visible.set(true);
  }

}
