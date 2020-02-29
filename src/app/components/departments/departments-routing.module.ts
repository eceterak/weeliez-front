import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
    { path: '', component: DepartmentListComponent },
    { path: 'create', component: DepartmentComponent },
    { path: ':id', component: DepartmentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DepartmentsRoutingModule {}