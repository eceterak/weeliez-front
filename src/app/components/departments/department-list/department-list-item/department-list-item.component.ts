import { Component, Input } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from '../../department.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: '[app-department-list-item]',
  templateUrl: './department-list-item.component.html',
  styleUrls: ['./department-list-item.component.scss']
})
export class DepartmentListItemComponent {

    @Input() department: Department;

    constructor(
        private departmentService: DepartmentService,
        private alertService: AlertService
    ) {}

    onDeleteDepartment() {
        this.departmentService.deleteDepartment(this.department.id).subscribe(
            (_) => {
                this.alertService.alert.next({
                    messages: 'Department deleted',
                    class: 'success'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }
}
