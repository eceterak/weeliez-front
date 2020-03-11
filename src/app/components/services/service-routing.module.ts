import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';


const routes: Routes = [
    { path: '', component: ServiceListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ServiceRoutingModule {}