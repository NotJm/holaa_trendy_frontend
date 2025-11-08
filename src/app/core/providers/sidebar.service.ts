import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isCollapsed = signal<boolean>(false);

  public toggle(): void {
    this.isCollapsed.update((value) => !value);
  }
}
