import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../core/providers/api/user.service';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    imports: [CommonModule]
})
export class UserComponent {
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}
}
