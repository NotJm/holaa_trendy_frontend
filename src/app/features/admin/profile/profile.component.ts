import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    phone: '+1 (555) 123-4567',
    location: 'Ciudad de México, México',
    bio: 'Administrador de sistemas con más de 5 años de experiencia en gestión de plataformas web y aplicaciones móviles.',
    joinDate: '15 de enero, 2022',
    lastActive: 'Hoy, 10:30 AM'
  };

  // Para la sección de actividad reciente
  activities = [
    { action: 'Actualizó la configuración del sistema', date: 'Hoy, 09:45 AM' },
    { action: 'Añadió un nuevo usuario', date: 'Ayer, 03:20 PM' },
    { action: 'Modificó permisos de acceso', date: 'Hace 2 días, 11:30 AM' },
    { action: 'Generó reporte mensual', date: 'Hace 3 días, 02:15 PM' }
  ];

  // Para la sección de configuración
  settings = {
    notifications: true,
    twoFactorAuth: false,
    emailUpdates: true,
    darkMode: false
  };

  // Pestañas de navegación
  activeTab: 'info' | 'security' | 'activity' | 'settings' = 'info';

  constructor() {}

  ngOnInit(): void {
    // Aquí podrías cargar los datos del usuario desde un servicio
  }

  setActiveTab(tab: 'info' | 'security' | 'activity' | 'settings'): void {
    this.activeTab = tab;
  }

  saveProfile(): void {
    // Aquí implementarías la lógica para guardar los cambios del perfil
    alert('Perfil actualizado correctamente');
  }

  updatePassword(): void {
    // Aquí implementarías la lógica para actualizar la contraseña
    alert('Contraseña actualizada correctamente');
  }

  toggleSetting(setting: string): void {
    // @ts-ignore: Ignorar error de tipado dinámico
    this.settings[setting] = !this.settings[setting];
  }
}