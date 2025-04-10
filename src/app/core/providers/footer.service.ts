import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  visible = signal<boolean>(true);

  hide(): void {
    this.visible.set(false);
  }

  show(): void {
    this.visible.set(true);
  }


}