import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/providers/api/auth.service'; // Asegúrate de que esta ruta sea correcta
import { FooterService } from '../../../core/providers/footer.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../../core/providers/sidebar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  constructor(
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
    public readonly sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.navbarService.hide(), this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show(), this.footerService.show();
  }

}
