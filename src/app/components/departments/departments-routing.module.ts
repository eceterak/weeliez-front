import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';

const routes: Routes = [
    { path: '', component: DepartmentListComponent },
    { path: 'create', component: DepartmentDialogComponent },
    { path: ':id', component: DepartmentDialogComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DepartmentsRoutingModule {}