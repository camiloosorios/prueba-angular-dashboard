import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
