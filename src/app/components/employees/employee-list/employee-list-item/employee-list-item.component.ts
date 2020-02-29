import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../employee.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: '[app-employee-list-item]',
  templateUrl: './employee-list-item.component.html',
  styleUrls: ['./employee-list-item.component.scss']
})
export class EmployeeListItemComponent {

    @Input() employee: Employee;

    constructor(
        private employeeService: EmployeeService, 
        private alertService: AlertService
    ) {}

    onDeleteEmployee() {
        this.employeeService.deleteEmployee(this.employee.id).subscribe(
            (_) => {
                this.alertService.alert.next({
                    messages: 'Employee deleted',
                    class: 'success'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

}
