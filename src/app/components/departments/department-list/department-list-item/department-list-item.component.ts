import { Component, Input } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from '../../department.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DepartmentDialogComponent } from '../../department-dialog/department-dialog.component';

@Component({
  selector: '[app-department-list-item]',
  templateUrl: './department-list-item.component.html',
  styleUrls: ['./department-list-item.component.scss']
})
export class DepartmentListItemComponent {

    @Input() department: Department;

    constructor(
        private departmentService: DepartmentService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    onDeleteDepartment() {
        this.departmentService.deleteDepartment(this.department.id).subscribe(
            (_) => {
                this.snackBar.open('Department deleted', '', {
                    horizontalPosition: 'right'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

    onEditDepartment() {
        this.dialog.open(DepartmentDialogComponent, {
            width: '800px',
            data: this.department.id,
            position: { 
                top: '50px' 
            }
        });
    }
}
