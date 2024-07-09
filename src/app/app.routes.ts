import {mapToCanActivate, Routes} from "@angular/router";
import {AuthGuard} from "./features/auth/auth.guard";
import {NotFoundComponent} from "./commons/pages/not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {
    path: 'homepage',
    loadComponent: () => import('./commons/components/manager-homepage/manager-homepage.component')
      .then(c => c.ManagerHomepageComponent)
  },
  {
    path: 'home',
    data: { requireAuthentication: true },
    canActivate: mapToCanActivate([AuthGuard]),
    loadComponent: () => import('./commons/pages/home/home.component')
      .then(c => c.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component')
      .then(c => c.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import('./features/auth/components/logout/logout.component')
      .then(c => c.LogoutComponent)
  },
  { path: '404', component:NotFoundComponent},
  {
    path: '**',
    loadComponent: () => import('./commons/pages/not-found/not-found.component')
      .then(c => c.NotFoundComponent)
  }
];
