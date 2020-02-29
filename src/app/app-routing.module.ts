import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent, 
        canActivate: [AuthGuard], 
        children: [
            { path: 'shift-planner', loadChildren: () => import('./components/rotas/rotas.module').then(m => m.RotasModule) },
            { path: 'employees', loadChildren: () => import('./components/employees/employees.module').then(m => m.EmployeesModule) },
            { path: 'departments', loadChildren: () => import('./components/departments/departments.module').then(m => m.DepartmentsModule) }
        ] 
    },
    { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {}