import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../core/providers/admin.service';

interface User {
  username: string;
  email: string;
  verification: boolean;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [CommonModule]
})
export class UserComponent {
  users: User[] = [
    { username: 'johndoe', email: 'johndoe@example.com', verification: true },
    { username: 'janedoe', email: 'janedoe@example.com', verification: false },
    { username: 'michael123', email: 'michael123@example.com', verification: true },
    { username: 'sarah_w', email: 'sarah_w@example.com', verification: false },
    { username: 'david99', email: 'david99@example.com', verification: true }
  ]; // Define el array de usuarios

  constructor(private adminService: AdminService,
  ) {}

  ngOnInit(): void {}
}
