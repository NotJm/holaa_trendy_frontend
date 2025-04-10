import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/providers/auth.service';

@Component({
    selector: 'app-side-bar',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
