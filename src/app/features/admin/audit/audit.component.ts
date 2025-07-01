import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AuditoriaItem {
  id: number;
  nombreUsuario: string;
  accion: 'Login' | 'Update' | 'Delete' | 'Create' | 'Logout';
  fecha: string;
  detalle: string;
  hora: string;
}

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  Math = Math;

  auditoriaItems: AuditoriaItem[] = [
    {
      id: 1,
      nombreUsuario: 'admin',
      accion: 'Login',
      fecha: '3/4/24',
      hora: '12:00 AM',
      detalle: 'Usuario admin inició sesión'
    },
    {
      id: 2,
      nombreUsuario: 'user1',
      accion: 'Update',
      fecha: '3/3/24',
      hora: '12:00 AM',
      detalle: 'Usuario user1 actualizó un registro'
    },
    {
      id: 3,
      nombreUsuario: 'admin',
      accion: 'Delete',
      fecha: '3/2/24',
      hora: '12:00 AM',
      detalle: 'Usuario admin eliminó un registro'
    },
    {
      id: 4,
      nombreUsuario: 'user2',
      accion: 'Create',
      fecha: '3/1/24',
      hora: '12:00 AM',
      detalle: 'Usuario user2 creó un nuevo registro'
    },
    {
      id: 5,
      nombreUsuario: 'user3',
      accion: 'Logout',
      fecha: '2/28/24',
      hora: '12:00 AM',
      detalle: 'Usuario user3 cerró sesión'
    },
    {
      id: 6,
      nombreUsuario: 'user1',
      accion: 'Update',
      fecha: '2/27/24',
      hora: '12:00 AM',
      detalle: 'Usuario user1 actualizó su perfil'
    }
  ];

  filteredItems: AuditoriaItem[] = [];
  searchTerm: string = '';
  selectedAction: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  ngOnInit() {
    this.filteredItems = [...this.auditoriaItems];
    this.calculateTotalPages();
  }

  onSearch() {
    this.filteredItems = this.auditoriaItems.filter(item => 
      item.nombreUsuario.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.detalle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    if (this.selectedAction) {
      this.filteredItems = this.filteredItems.filter(item => 
        item.accion === this.selectedAction
      );
    }
    
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  onFilterByAction() {
    this.onSearch();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedAction = '';
    this.filteredItems = [...this.auditoriaItems];
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get paginatedItems(): AuditoriaItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItems.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getActionBadgeClass(accion: string): string {
    const classes = {
      'Login': 'bg-green-100 text-green-800 border-green-200',
      'Logout': 'bg-red-100 text-red-800 border-red-200',
      'Create': 'bg-blue-100 text-blue-800 border-blue-200',
      'Update': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Delete': 'bg-red-100 text-red-800 border-red-200'
    };
    return classes[accion as keyof typeof classes] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  exportToCSV() {
    const csvContent = [
      ['Nombre de Usuario', 'Acción', 'Fecha', 'Hora', 'Detalle'],
      ...this.filteredItems.map(item => [
        item.nombreUsuario,
        item.accion,
        item.fecha,
        item.hora,
        item.detalle
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'auditoria-usuarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
