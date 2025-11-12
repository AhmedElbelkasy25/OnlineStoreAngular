import { Routes } from '@angular/router';
import { UserComponent } from './layouts/user-component/user-component';
import { AuthComponent } from './layouts/auth-component/auth-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        loadChildren: () => import('./user/user-module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
      },
    ],
  },
];
