import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RotaComponent } from './rota/rota.component';

const routes: Routes = [
    { path: '', component: RotaComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppointmentsRoutingModule {}