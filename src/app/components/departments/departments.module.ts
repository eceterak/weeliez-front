import { NgModule } from '@angular/core';
import { DepartmentListComponent } from './department-list/department-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentListItemComponent } from './department-list/department-list-item/department-list-item.component';
import { DepartmentComponent } from './department/department.component';

@NgModule({
    declarations: [
        DepartmentListComponent,
        DepartmentListItemComponent,
        DepartmentComponent
    ],
    imports: [
        SharedModule,
        DepartmentsRoutingModule
    ]
})

export class DepartmentsModule {}