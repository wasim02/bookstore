import { AuthGuard } from './src/app/auth.guard';
import { LoginPageComponent } from './src/app/login-page/login-page.component';
import { Routes } from '@angular/router';
import { CrudPageComponent } from './src/app/crud-page/crud-page.component';
import { RegistrationComponent } from './src/app/registration/registration.component';

export const appRoutes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'crud',
    component: CrudPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
