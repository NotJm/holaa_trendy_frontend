import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailConfiguration, UpdateEmailConfiguration } from '../../../core/interfaces/emal.configuration';
import { IncidentConfiguration, UpdateIncidentConfiguration } from '../../../core/interfaces/incident.configuration';
import { AdminService } from '../../../core/providers/admin.service';

@Component({
    selector: 'app-incidents',
    imports: [CommonModule, FormsModule],
    templateUrl: './incidents.component.html',
    styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  // Configuración del correo
  emailConfiguration: Partial<EmailConfiguration> = {}
  updateEmailConfiguration: UpdateEmailConfiguration = {}

  // Configuración del módulo de incidencias
  incidentConfiguration: Partial<IncidentConfiguration> = {}
  updateIncidentConfiguration: UpdateIncidentConfiguration = {}


  // Configuración del filtro de usuarios bloqueados por días
  blockedUserFilterDays: number = 0;

  /**
   * Constructor para inicializar aspectos del componente de configuracion
   * @param adminService 
   * @param notificationService 
   */
  constructor(
    private readonly adminService: AdminService,
  ) {
  }

  /**
   * Metodo inicializador de configuraciones
   */
  ngOnInit(): void {
    this.loadIncidentConfiguration();
    this.loadEmailConfiguration();
  }

  /**
   * Metodo para cargar la configuracion del modulo de incidencias
   */
  loadIncidentConfiguration(): void {

  }


  /**
   * Metodo para cargar la configuracion del modelo de email
   */
  loadEmailConfiguration(): void {

  }

  /**
   * Metodo que actualiza la configuracion de email
   */
  editEmailConfiguration(): void {
    
  }

  /**
   * Metodo que actualiza la configuracion de incidencias
   */
  editIncidentConfiguration(): void {
    
  }

}
