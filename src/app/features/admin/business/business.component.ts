import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  CompanyProfile,
  UpdateBusinessProfile,
} from "../../../core/interfaces/business.profile";
import { SocialSite, UpdateSocialSite } from "../../../core/interfaces/social.site";
import { AdminService } from "../../../core/providers/admin.service";

@Component({
    selector: "app-business",
    imports: [CommonModule, FormsModule],
    templateUrl: "./business.component.html",
    styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {
  businessProfile: Partial<CompanyProfile> = {};
  updateBusinessProfile: Partial<UpdateBusinessProfile> = {};
  


  

  /**
   * Constructor para inicializar los datos
   */
  constructor(
    private readonly adminService: AdminService,
  ) {}

  /**
   * Primero cargamos los datos de la base de datos
   */
  ngOnInit(): void {
    this.loadBusinessProfile();
  }

  /**
   * Metodo para cargar la configuracion de incidencia de la base de datos
   */
  loadBusinessProfile(): void {
 
  }

  /**
   * Abre el widget de Cloudinary para subir un logo y actualiza `logoUrl` en `businessProfile` cuando se sube con éxito
   */
  openCloudinaryWidget() {
  
  }

  /**
   * Metodo para guardar informacion del slogan
   */
  updateIncidentConfiguration() {

 
  }

 
}
