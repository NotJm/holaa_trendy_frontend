import { Component, inject, OnDestroy, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../core/providers/auth.service" // Asegúrate de que esta ruta sea correcta
import { SidebarComponent } from "../sidebar/sidebar.component"
import { NavbarService } from "../../../core/providers/navbar.service"
import { FooterService } from "../../../core/providers/footer.service"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  isSidebarOpen = false

  // Usando el nuevo patrón de inyección funcional de Angular 19
  private authService = inject(AuthService)
  private router = inject(Router)

  constructor(
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
  ) {

  }

  ngOnInit(): void {
    this.navbarService.hide()
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show(),
    this.footerService.show()
  }


  logOut(): void {}
}

