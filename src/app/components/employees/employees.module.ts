import { NgModule } from '@angular/core';
import { EmployeeListItemComponent } from './employee-list/employee-list-item/employee-list-item.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
    declarations: [
        EmployeeListItemComponent,
        EmployeeListComponent,
        EmployeeComponent,
    ],
    imports: [
        SharedModule,
        EmployeesRoutingModule
    ]
})

export class EmployeesModule {}