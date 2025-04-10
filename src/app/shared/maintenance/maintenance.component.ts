import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { ServerService } from '../../core/providers/server.service';
import { ButtonControlComponent } from '../ui/button/button-control.component';
import { catchError, delay, finalize, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance.component.html',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      state('void', style({ transform: 'scale(0)' })),
      transition(':enter', [
        animate('0.5s ease-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('heartBeat', [
      state('normal', style({ transform: 'scale(1)' })),
      state('beat', style({ transform: 'scale(1.2)' })),
      transition('normal <=> beat', animate('0.3s ease-in-out'))
    ]),
    trigger('fadeInDelay', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s 300ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInDelayMedium', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s 400ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInDelayLong', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s 500ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInDelayLonger', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s 600ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('formSuccess', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      transition(':enter', [
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  isRetrying = signal(false);
  isAvailableComponent = signal<boolean>(false);
  email = '';
  submitted = false;
  heartState: 'normal' | 'beat' = 'normal';
  private heartbeatInterval: any;

  constructor(private readonly serverService: ServerService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.connectToServer();
    this.isAvailableComponent.set(true);
  }

  ngOnDestroy(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }

  connectToServer() {
    this.isRetrying.update(() => true);
    this.startHeartBeat();
    this.serverService
      .connect()
      .pipe(
        finalize(() => this.isRetrying.update(() => false)),
        catchError((error) => {
          console.error('Error al conectar al servidor:', error);
          return of(null); // Devuelve un valor seguro en caso de error
        })
      )
      .subscribe();
  }

  startHeartBeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.ngZone.runOutsideAngular(() => {
      this.heartbeatInterval = setInterval(() => {
        this.ngZone.run(() => {
          this.heartState = 'beat';
          setTimeout(() => {
            this.heartState = 'normal';
          }, 300);
        });
      }, 2000);
    });
  }

}