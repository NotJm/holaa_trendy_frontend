import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Audit } from '../../../core/interfaces/audit.interface';
import { AdminService } from '../../../core/providers/admin.service';
@Component({
    selector: 'app-audit',
    imports: [CommonModule],
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  auditInformation: Audit[] = [];
  displayedAuditInformation: Audit[] = []; 
  currentPage: number = 1;
  auditsPerPage: number = 6; 
  totalAudits: number = 0;
  

  constructor(private readonly adminService: AdminService,
  ) {

  }

 /*  ngOnInit(): void {
    this.loadAuditInformation();
  } */

    ngOnInit(): void {
      this.auditInformation = [
        { id: 1, action: 'Login', user: 'admin', date: '2024-03-04', details: 'Usuario admin inició sesión' },
        { id: 2, action: 'Update', user: 'user1', date: '2024-03-03', details: 'Usuario user1 actualizó un registro' },
        { id: 3, action: 'Delete', user: 'admin', date: '2024-03-02', details: 'Usuario admin eliminó un registro' },
        { id: 4, action: 'Create', user: 'user2', date: '2024-03-01', details: 'Usuario user2 creó un nuevo registro' },
        { id: 5, action: 'Logout', user: 'user3', date: '2024-02-28', details: 'Usuario user3 cerró sesión' },
        { id: 6, action: 'Update', user: 'user1', date: '2024-02-27', details: 'Usuario user1 actualizó su perfil' },
        { id: 7, action: 'Delete', user: 'admin', date: '2024-02-26', details: 'Usuario admin eliminó un usuario' },
        { id: 8, action: 'Login', user: 'user4', date: '2024-02-25', details: 'Usuario user4 inició sesión' }
      ];
      this.totalAudits = this.auditInformation.length;
      this.setPage(1);
    }
    

  loadAuditInformation(): void {
   
  }

   // Establece los datos a mostrar para la página actual
   setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.auditsPerPage;
    const endIndex = startIndex + this.auditsPerPage;
    this.displayedAuditInformation = this.auditInformation.slice(startIndex, endIndex);
  }

  // Calcula el número total de páginas
  getTotalPages(): number[] {
    return Array(Math.ceil(this.totalAudits / this.auditsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }


}
