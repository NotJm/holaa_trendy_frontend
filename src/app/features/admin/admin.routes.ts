
import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard/dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';


export const ADMIN_ROUTES: Routes = [
    {
      path: "",
      component: DashboardAdminComponent,
      canMatch: [adminGuard],
      children: [
        { path: "", redirectTo: "home", pathMatch: "full" },
        {
          path: "home",
          loadComponent: () => import("./home/home.component").then((m) => m.HomeAdminComponent),
        },
        {
          path: "audit",
          loadComponent: () => import("./audit/audit.component").then((m) => m.AuditComponent),
        },
        {
          path: "users",
          loadComponent: () => import("./user/user.component").then((m) => m.UserComponent),
        },
        {
          path: "incidents",
          loadComponent: () => import("./incidents/incidents.component").then((m) => m.IncidentsComponent),
        },
        {
          path: "documents",
          loadComponent: () => import("./document/document.component").then((m) => m.DocumentComponent),
        },
        {
          path: "statistics",
          loadComponent: () => import("./statistics/statistics.component").then((m) => m.StatisticsComponent),
        },
        {
          path: "business",
          loadComponent: () => import("./business/business.component").then((m) => m.BusinessComponent),
        },
        {
          path: "profile",
          loadComponent: () => import("./profile/profile.component").then((m) => m.ProfileComponent),
        },
      ],
    },
];
