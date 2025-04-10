import { Component, OnInit } from '@angular/core';
import { CreateSocialSite, SocialSite, UpdateSocialSite } from '../../../core/interfaces/social.site';
import { AdminService } from '../../../core/providers/admin.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-social',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './social.component.html',
    styleUrl: './social.component.css'
})
export class SocialComponent implements OnInit {

  socialSites: SocialSite[] = [];
  updateSocialSites: Partial<UpdateSocialSite> = {}
  createSocialSites: Partial<CreateSocialSite> = {}
  currentSocialSites: Partial<SocialSite> = {};

  formSocialSite: FormGroup;

  isEditSocialSiteOpen = false;
  isAddSocialSiteOpen = false;
  selectedSocialIndex?: number;

  /**
   * Constructor para inicializar parametros necesarios
   * @param adminService 
   * @param notificationService 
   * @param fb 
   */
  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService,
    private readonly fb: FormBuilder
  ) {
    this.formSocialSite = fb.group({
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      url:  ['', [Validators.required]],
      description: ['']
    })
  }

  /**
   * Metodo abstracto para poder inicializar y cargar datos necesarios de 
   * redes sociales
   */
  ngOnInit(): void {
    this.loadSocialSites()
  } 

  /**
   * Metodo para obtener datos de las redes sociales
   */
  loadSocialSites(): void {
    this.adminService.getSocialSites().subscribe({
      next:(socialSites) => {
        this.socialSites = socialSites
      },
      error:(err) => {
        this.notificationService.error(
          "Excepcion Producida",
          "Error obteniendo datos de redes sociales"
        )
      }
    })
  }

  /**
   * Abre el widget de Cloudinary para subir un logo y actualiza `logoUrl` en `businessProfile` cuando se sube con éxito
   */
  openCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dntrj0gde",
        uploadPreset: "HOLAA_IMAGEN",
        sources: ["local", "url"],
        multiple: false,
        clientAllowedFormats: ["webp"],
        maxImageFileSize: 2000000,
        cropping: true,
        croppingAspectRatio: 1,
        folder: "logos",
        transformation: [{ width: 128, height: 128, crop: "limit" }],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          this.formSocialSite.controls['icon'].setValue(result.info.secure_url);
          this.currentSocialSites.icon = result.info.secure_url;
        }
      }
    );
    widget.open();
  }

  openAddSocialSiteModal(): void {
    this.isAddSocialSiteOpen = true;
  }

  closeAddSocialSiteModal(): void {
    this.isAddSocialSiteOpen = false;
  }

  addSocialSite(): void {
    if (this.formSocialSite.valid) {
      this.createSocialSites = { ...this.formSocialSite.value};

      this.adminService.createSocialSite(this.createSocialSites).subscribe({
        next: (response) => {
          this.notificationService.success('Creado con exito', response.message);
          this.loadSocialSites();
          this.closeAddSocialSiteModal()
        },
        error: (error) => {
          this.notificationService.error('Excepcion Producida', 'No se pudo crear la red social');
        }
      })

    } else {
      this.notificationService.error("Campos Invalidos", "Por favor, verifique los campos")
    }



  }

  openEditSocialEditModal(currentSocialSite: SocialSite): void {
    this.currentSocialSites = currentSocialSite;
    this.isEditSocialSiteOpen = true;
  }

  closeEditSocialSiteModal(): void {
    this.isEditSocialSiteOpen = false;
  }

  editSocialSite(): void {
    
    const { _id, create_date, update_date, ...socialSite } = this.currentSocialSites;

    this.updateSocialSites = socialSite;

    console.log(this.updateSocialSites);

    this.adminService.updateSocialSite(_id, this.updateSocialSites).subscribe({
      next: (response) => {
        this.notificationService.success('Actualizacion con exito', response.message)

        this.loadSocialSites()

        this.closeEditSocialSiteModal();

      },
      error: (err) => {
        this.notificationService.error('Excepcion producida', 'Error al actualizar red social');
      }
    })
  }

  deleteSocialSite(currentSocialSite: SocialSite): void {
    this.adminService.deleteSocialSite(currentSocialSite._id).subscribe({
      next: (response) => {
        this.notificationService.success('Eliminacion con exito', response.message)

        this.loadSocialSites()
      },
      error: (err) => {
        this.notificationService.error('Excepcion producida', 'Error al eliminar red social');
      } 
    })
  }

  
}
