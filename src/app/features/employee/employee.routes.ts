
import { Routes } from '@angular/router';
import { DashboardEmployeeComponent } from './dashboard/dashboard.component';
import { employeeGuard } from '../../core/guards/employee.guard';


export const EMPLOYEE_ROUTES: Routes = [
    {
      path: "",
      component: DashboardEmployeeComponent,
      canMatch: [ employeeGuard ],
      children: [
        { path: "", redirectTo: "home", pathMatch: "full" },
        {
          path: "products",
          loadComponent: () => import("./crud-products/crud-products.component").then((m) => m.CrudProductsComponent),
        },
        {
          path: "home",
          loadComponent: () => import("./home/home.component").then((m) => m.HomeEmployeeComponent),
        },

        {
          path: "categories",
          loadComponent: () => import("./crud-category/crud-category.component").then((m) => m.CrudCategoryComponent),
        },
        {
          path: "sidebar",
          loadComponent: () => import("./side-bar/side-bar.component").then((m) => m.SideBarComponent),
        },
        
      ],
    },
];
