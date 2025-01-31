import { Routes } from '@angular/router';
import { logoutActiveGuard } from './shared/guards/logout-active.guard';
import { loginActiveGuard } from './shared/guards/login-active.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [logoutActiveGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.profileRoutes),
    canActivate: [loginActiveGuard]
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.routes').then((m) => m.postsRoutes),
    canActivate: [loginActiveGuard]
  },
];
