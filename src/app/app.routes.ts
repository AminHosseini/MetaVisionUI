import { Routes } from '@angular/router';

/**
 * روت های کلی برنامه
 */
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  // { path: '**', redirectTo: 'not-found' },
];
