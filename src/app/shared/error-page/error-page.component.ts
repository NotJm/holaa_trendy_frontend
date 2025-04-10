import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UnpicImageDirective } from '@unpic/angular';

@Component({
    selector: 'app-page-not-found',
    imports: [RouterLink, UnpicImageDirective],
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent {
  error: string = '404';
  title: string = 'Oops... parece que te perdiste';
  subtitle: string = 'La página que buscas no está aquí, pero no te preocupes, ¡te ayudamos a volver al camino!';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe((data) => {
      this.error = data['error'] || this.error;
      this.title = data['title'] || this.title;
      this.subtitle = data['subtitle'] || this.subtitle;
    });
  }
}
