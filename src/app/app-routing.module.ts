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
            { path: 'doctors', loadChildren: () => import('./components/doctors/doctors.module').then(m => m.DoctorsModule) },
            { path: 'services', loadChildren: () => import('./components/services/services.module').then(m => m.ServicesModule) },
            { path: 'patients', loadChildren: () => import('./components/patients/patients.module').then(m => m.PatientsModule) },
            { path: 'departments', loadChildren: () => import('./components/departments/departments.module').then(m => m.DepartmentsModule) },
            { path: 'appointments', loadChildren: () => import('./components/appointments/appointments.module').then(m => m.AppointmentsModule) }
        ] 
    },
    { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {}