import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { DepartmentService } from '../department.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss']
})
export class DepartmentDialogComponent implements OnInit {

    editMode: boolean = false;
    departmentForm: FormGroup;
    department: Department;
    getErrorMessage = UtilitiesService.getErrorMessage;

    constructor(
        private departmentService: DepartmentService,
        @Inject(MAT_DIALOG_DATA) private id,
        private dialogRef: MatDialogRef<DepartmentDialogComponent>,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.departmentForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)])
        });

        if(this.id) {
            this.editMode = true;

            this.departmentService.getDepartment(this.id).subscribe(
                (department: Department) => {
                    this.department = department;

                    this.departmentForm.get('name').setValue(this.department.name);
                }
            )
        }
    }

    onFormSubmit() {
        if(this.departmentForm.valid) {
            if(this.editMode) {
                this.departmentService.updateDepartment(this.department.id, this.departmentForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Department updated!', '', {
                            horizontalPosition: 'right',
                            politeness: 'assertive'
                        });

                        this.dialogRef.close();
                    },
                    (errorResponse: HttpErrorResponse) => {
                        console.log(errorResponse);
                    }
                );
            } else {
                const newDepartment = new Department(null, this.departmentForm.value.name);
    
                this.departmentService.createDepartment(newDepartment).subscribe(
                    (_) => {
                        this.snackBar.open('Department created!', '', {
                            horizontalPosition: 'right',
                            politeness: 'assertive'
                        });

                        this.dialogRef.close();
                    },
                    (errorResponse: HttpErrorResponse) => {
                        console.log(errorResponse);
                    }
                );
            }
        }
    }

}
