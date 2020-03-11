import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentManagerComponent } from './appointment-manager/appointment-manager.component';

const routes: Routes = [
    { path: '', component: AppointmentManagerComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppointmentsRoutingModule {}