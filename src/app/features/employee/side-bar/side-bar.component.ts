import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ImageControlComponent } from '../../../shared/ui/controls/image-control/image-control.component';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, ImageControlComponent,],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  
  // Información del usuario (puedes obtenerla de un servicio)
  userInfo = {
    name: 'Juan Pérez',
    role: 'Desarrollador',
    avatar: 'JP',
    isOnline: true
  };

  // Contadores para notificaciones
  taskCount = 3;
  messageCount = 2;

  ngOnInit(): void {
    // Aquí puedes cargar la información del usuario desde un servicio
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    // Implementar lógica para cargar información del usuario
    // Ejemplo: this.userService.getCurrentUser().subscribe(...)
  }

  onLogout(): void {
    // Implementar lógica de logout
    console.log('Cerrando sesión...');
  }
}