import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { UserService } from '../../../core/providers/api/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeAdminComponent implements OnInit, OnDestroy {
  /** A subject for destroying the components */
  #destroy$ = new Subject<void>();
  /** A signal for admin's username */
  userName: string = 'Admin';

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getUserName();
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private getUserName(): void {
    const cachedUser = this.userService.getCachedUser();
    if (cachedUser) {
      this.userName = cachedUser.username;
    }

    this.userService.getUserData().subscribe({
      next: (response: IApiResponse) => { this.userName = response.data.username },
    });
  }

  // Dashboard statistics
  dashboardStats = [
    {
      title: 'Total Usuarios',
      value: '3,456',
      icon: 'user-group]',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Ingresos',
      value: '$34,245',
      icon: 'dollar-sign',
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Sesiones Activas',
      value: '234',
      icon: 'activity',
      change: '-2%',
      trend: 'down',
    },
    {
      title: 'Tasa de Conversión',
      value: '3.45%',
      icon: 'percent',
      change: '+5%',
      trend: 'up',
    },
  ];

  // Recent activities
  recentActivities = [
    {
      user: 'Juan Pérez',
      action: 'creó una nueva cuenta',
      time: 'hace 2 minutos',
      avatar: 'https://ui-avatars.com/api/?name=Juan+Pérez',
    },
    {
      user: 'María García',
      action: 'completó su perfil',
      time: 'hace 10 minutos',
      avatar: 'https://ui-avatars.com/api/?name=María+García',
    },
    {
      user: 'Carlos Rodríguez',
      action: 'realizó una compra',
      time: 'hace 1 hora',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodríguez',
    },
    {
      user: 'Ana Martínez',
      action: 'envió un ticket de soporte',
      time: 'hace 3 horas',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Martínez',
    },
  ];

  // Tasks
  tasks = [
    {
      title: 'Revisar nuevos registros de usuarios',
      priority: 'high',
      dueDate: 'Hoy',
    },
    {
      title: 'Aprobar envíos de contenido',
      priority: 'medium',
      dueDate: 'Mañana',
    },
    {
      title: 'Actualizar inventario de productos',
      priority: 'low',
      dueDate: 'Próxima semana',
    },
    {
      title: 'Responder consultas de clientes',
      priority: 'high',
      dueDate: 'Hoy',
    },
  ];
}
