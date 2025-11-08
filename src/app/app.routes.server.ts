import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },

  // 🔑 rutas dinámicas auth → render dinámico
  {
    path: 'auth/login/:step/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'auth/signup/:step/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'auth/request-forgot-password/:step',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/detail/:code',
    renderMode: RenderMode.Server,
  
  },

  // 🔑 ejemplo de ruta dinámica con valores conocidos
  {
    path: 'products/:category',
    renderMode: RenderMode.Server,
  },
];
