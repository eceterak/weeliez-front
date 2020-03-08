import { NgModule } from '@angular/core';
import { DepartmentListComponent } from './department-list/department-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentListItemComponent } from './department-list/department-list-item/department-list-item.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';

@NgModule({
    declarations: [
        DepartmentListComponent,
        DepartmentListItemComponent,
        DepartmentDialogComponent
    ],
    imports: [
        SharedModule,
        DepartmentsRoutingModule
    ],
    entryComponents: [ DepartmentDialogComponent ]
})

export class DepartmentsModule {}