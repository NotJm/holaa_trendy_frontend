import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'icon-control',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './icon-control.component.html',
})
export class IconControlComponent {
  /** Texto opcional junto al ícono */
  @Input() hasText: boolean = false;
  @Input() textClass?: string;
  @Input() text?: string;

  /** Clases del ícono (por ejemplo, icon-[mdi--account] w-6 h-6 ...) */
  @Input() iconClass?: string;

  /** Clases del contenedor/enlace/botón */
  @Input() linkClass?: string;

  /** Modo enlace/botón */
  @Input() hasLink: boolean = false;          // true => se renderiza <a>, false => <button>
  @Input() isExternalLink: boolean = false;   // solo si hasLink=true y es un href externo
  @Input() link?: string;                     // routerLink (interno) o href (externo)

  /** Evento de clic (cuando hasLink=false o si quieres escuchar también en enlaces) */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /** Handler único para propagar el clic al padre */
  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
