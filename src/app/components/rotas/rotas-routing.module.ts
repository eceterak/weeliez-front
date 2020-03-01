import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RotaComponent } from './rota/rota.component';
import { RotaListComponent } from './rota-list/rota-list.component';

const routes: Routes = [
    { path: '', component: RotaListComponent },
    { path: 'create', component: RotaComponent },
    { path: ':id', component: RotaComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RotasRoutingModule {}