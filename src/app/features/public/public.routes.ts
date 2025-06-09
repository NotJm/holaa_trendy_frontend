import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./home/home.component').then(m => m.HomeComponent),
    title: 'HOLAA Trendy',
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'policies',
    loadComponent: () =>
      import('./policies/policies.component').then(m => m.PoliciesComponent)
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts/contacts.component').then(m => m.ContactsComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./wishlist/wishlist.component').then(m => m.WishlistComponent),
    canActivate: [authGuard]
  }
];