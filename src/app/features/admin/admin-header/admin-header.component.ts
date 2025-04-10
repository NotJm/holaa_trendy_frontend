import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Order {
  id: string;
  date: string;
  productName: string;
  price: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
}

@Component({
    selector: 'app-admin-header',
    imports: [CommonModule],
    templateUrl: './admin-header.component.html',
    styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark');
  }

  orders: Order[] = [
    { id: '#123245', date: '14-12-2020', productName: 'Decorative box', price: '125', status: 'Delivered' },
    { id: '#678457', date: '13-12-2020', productName: 'Plantation box', price: '120', status: 'Cancelled' },
    { id: '#123245', date: '12-12-2020', productName: 'Camera film', price: '156', status: 'Delivered' },
    { id: '#87245', date: '10-12-2020', productName: 'Visual lace', price: '125', status: 'Delivered' },
    { id: '#273245', date: '11-11-2020', productName: 'Decorative box', price: '180', status: 'Pending' },
    { id: '#789245', date: '10-11-2020', productName: 'Decorative box', price: '190', status: 'Delivered' },
  ];
}
