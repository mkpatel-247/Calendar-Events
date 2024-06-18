import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
    ],
  },
  {
    path: 'error404',
    loadComponent: () =>
      import('../shared/components/error404/error404.component').then(
        (m) => m.Error404Component
      ),
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full',
  },
];
