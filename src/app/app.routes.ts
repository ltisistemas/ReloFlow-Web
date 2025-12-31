import { Routes } from '@angular/router';
import { authGuard, authRedirectGuard } from './core/config/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authRedirectGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/domain/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./modules/auth/domain/components/signup/signup.component').then(m => m.SignupComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'portal',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/portal/domain/components/portal-layout/portal-layout.component').then(m => m.PortalLayoutComponent)
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
