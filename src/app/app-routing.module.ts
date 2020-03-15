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
            // { path: 'doctors', loadChildren: () => import('./components/doctors/doctors.module').then(m => m.DoctorsModule) }
        ] 
    },
    { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {}