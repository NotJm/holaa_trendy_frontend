import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  }, 
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((m) => m.EMPLOYEE_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.routes').then(
        (m) => m.PRODUCT_ROUTES,
      ),
  },
  {
    path: '500',
    loadComponent: () =>
      import('./shared/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent,
      ),
    data: {
      error: '500',
      title: '¡Oops... algo salio mal!',
      subtitle:
        'Hemos encontrado un problema inesperado mientras procesábamos tu solicitud. No te preocupes, ya estamos trabajando para solucionarlo.',
    },
  },
  {
    path: '400',
    loadComponent: () =>
      import('./shared/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent,
      ),
    data: {
      error: '400',
      title: 'Algo salió mal con tu solicitud',
      subtitle:
        'Parece que hubo un problema con la solicitud que enviaste. Asegúrate de que todo esté correcto e inténtalo de nuevo. ¡No te preocupes, estamos aquí para ayudarte a volver al camino!',
    },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./shared/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent,
      ),
    data: {
      error: '404',
      title: 'Página no encontrada',
      subtitle: 'No pudimos encontrar la página que buscas.',
    },
  },
  { path: '**', redirectTo: '404' },
];
