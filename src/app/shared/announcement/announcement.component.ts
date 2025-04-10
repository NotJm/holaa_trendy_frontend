import { animate, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Input,
  OnInit
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BeforeLoadingService } from '../../core/providers/before-loading.service';
import { ModalService } from '../../core/providers/modal.service';

@Component({
  selector: 'announcement-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),

    trigger('modalContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.98)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),

    trigger('leftContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate(
          '350ms 100ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),

    trigger('rightContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '350ms 100ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AnnouncementComponent implements OnInit {
  isOpen = computed(() => this.modalService.open());

  @Input({ required: true }) modalId: string = '';

  private cookieModalId: string = `announcement_offer`;

  constructor(
    private readonly cookieService: CookieService,
    private readonly modalService: ModalService,
    private readonly platform: Platform,
    private readonly beforeLoadingService: BeforeLoadingService,
  ) {}

  ngOnInit(): void {
    if (!this.platform.isBrowser) return;

    // this.beforeLoadingService.waitForCookies({
    //   callback: () => this.modalService.show(),
    //   cookieCheck: () => !this.cookieService.check(this.cookieModalId),
    //   interval: 1000,
    // });
  }

  close(): void {
    this.cookieService.set(this.cookieModalId, 'true');
    this.modalService.close();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.close();
    }
  }
}
