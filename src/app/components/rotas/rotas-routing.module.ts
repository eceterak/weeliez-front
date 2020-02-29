import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RotasListItemComponent } from './rotas-list/rotas-list-item/rotas-list-item.component';
import { RotaComponent } from './rota/rota.component';

const routes: Routes = [
    { path: '', component: RotasListItemComponent },
    { path: 'create', component: RotaComponent },
    { path: ':id', component: RotaComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RotasRoutingModule {}