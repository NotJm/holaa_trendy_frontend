import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { UserService } from '../../../core/providers/api/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeEmployeeComponent implements OnInit, OnDestroy {
  /** A subject for destroying the components */
  #destroy$ = new Subject<void>();
  /** A signal for admin's username */
  userName: string = 'Employee';

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

  // Añadir este método para solucionar el error
  getCurrentDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('es-ES', options);
  }
}