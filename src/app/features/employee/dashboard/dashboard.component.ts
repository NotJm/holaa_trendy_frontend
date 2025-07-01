import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SideBarComponent } from "../../../features/employee/side-bar/side-bar.component";
import { NavbarService } from "../../../core/providers/navbar.service";
import { FooterService } from "../../../core/providers/footer.service";

@Component({
  selector: "app-dashboard-employee",
  standalone: true,
  imports: [CommonModule, RouterModule, SideBarComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardEmployeeComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;

  private router = inject(Router);
  private navbarService = inject(NavbarService);
  private footerService = inject(FooterService);

  ngOnInit(): void {
    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

  logOut(): void {
    // Aquí puedes integrar tu servicio de logout
    // Por ejemplo: this.authService.logout()
    this.router.navigate(['/login']);
  }
}



