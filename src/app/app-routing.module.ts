import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { BackLayoutComponent } from './components/back/back-layout/back-layout.component';
import { AuthGuard } from './components/auth/auth.guard';
import { FrontLayoutComponent } from './components/front/front-layout/front-layout.component';

const routes: Routes = [
    {
        path: '', 
        component: FrontLayoutComponent, 
        children: [] 
    },
    { 
        path: 'admin', 
        component: BackLayoutComponent, 
        canActivate: [AuthGuard], 
        children: [
            { path: 'brands', loadChildren: () => import('./components/back/departments/brands.module').then(m => m.BrandsModule) }
        ] 
    },
    { path: 'admin/login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {}