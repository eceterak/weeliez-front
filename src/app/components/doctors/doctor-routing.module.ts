import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorComponent } from './doctor/doctor.component';

const routes: Routes = [
    { path: '', component: DoctorListComponent },
    { path: 'create', component: DoctorComponent },
    { path: ':id', component: DoctorComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DoctorRoutingModule {}