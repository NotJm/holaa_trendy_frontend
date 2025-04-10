import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { NavbarService } from '../../../core/providers/navbar.service';
import { FooterService } from '../../../core/providers/footer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeAdminComponent {
  // Dashboard statistics
  dashboardStats = [
    { title: 'Total Usuarios', value: '3,456', icon: 'users', change: '+12%', trend: 'up' },
    { title: 'Ingresos', value: '$34,245', icon: 'dollar-sign', change: '+8%', trend: 'up' },
    { title: 'Sesiones Activas', value: '234', icon: 'activity', change: '-2%', trend: 'down' },
    { title: 'Tasa de Conversión', value: '3.45%', icon: 'percent', change: '+5%', trend: 'up' }
  ];

  // Recent activities
  recentActivities = [
    { user: 'Juan Pérez', action: 'creó una nueva cuenta', time: 'hace 2 minutos', avatar: 'https://ui-avatars.com/api/?name=Juan+Pérez' },
    { user: 'María García', action: 'completó su perfil', time: 'hace 10 minutos', avatar: 'https://ui-avatars.com/api/?name=María+García' },
    { user: 'Carlos Rodríguez', action: 'realizó una compra', time: 'hace 1 hora', avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodríguez' },
    { user: 'Ana Martínez', action: 'envió un ticket de soporte', time: 'hace 3 horas', avatar: 'https://ui-avatars.com/api/?name=Ana+Martínez' }
  ];

  // Tasks
  tasks = [
    { title: 'Revisar nuevos registros de usuarios', priority: 'high', dueDate: 'Hoy' },
    { title: 'Aprobar envíos de contenido', priority: 'medium', dueDate: 'Mañana' },
    { title: 'Actualizar inventario de productos', priority: 'low', dueDate: 'Próxima semana' },
    { title: 'Responder consultas de clientes', priority: 'high', dueDate: 'Hoy' }
  ];


}
