import { Component, OnInit, Inject } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Department } from 'src/app/models/department.model';
import { ServiceService } from '../services.service';
import { DepartmentService } from '../../departments/department.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss']
})
export class ServiceDialogComponent implements OnInit {

    editMode: boolean = false;
    serviceForm: FormGroup;
    service: Service;
    getErrorMessage = UtilitiesService.getErrorMessage;
    departments: Department[] = [];

    constructor(
        private serviceService: ServiceService, 
        private departmentService: DepartmentService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) private id,
        private dialogRef: MatDialogRef<ServiceDialogComponent>,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.initForm();

        this.departmentService.getSelectDepartments().subscribe(
            (response: HttpDataResponse) => {
                this.departments = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    initForm(): void {
        this.serviceForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'description': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'department': new FormControl(null, [Validators.required])
        });

        if(this.id) {
            this.editMode = true;

            this.serviceService.getService(this.id).subscribe(
                (service: Service) => {
                    this.service = service;

                    this.serviceForm.get('name').setValue(this.service.name);
                    this.serviceForm.get('description').setValue(this.service.description);
                    this.serviceForm.get('department').setValue(this.service.department);
                }
            );
        }
    }

    onFormSubmit(): void {
        if(this.serviceForm.valid) {
            if(this.editMode) {
                this.serviceService.updateService(this.service.id, this.serviceForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Service updated!', '', {
                            horizontalPosition: 'right',
                            politeness: 'assertive'
                        });

                        this.dialogRef.close();
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            } else {
                this.serviceService.createService(this.serviceForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Service created!', '', {
                            horizontalPosition: 'right',
                            politeness: 'assertive'
                        });

                        this.dialogRef.close();
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            }
        } else {
            this.setAlert();
        }
    }

    displayDepartmentName(department: Department): string {
        return department && department.name ? department.name : '';
    }

    setErrors(errors: object): void {
        for(let prop in errors) {
            if(this.serviceForm.contains(prop)) {
                this.serviceForm.controls[prop].setErrors({ http: errors[prop] });
            }
        }

        this.setAlert();
    }

    setAlert(): void {
        this.alertService.alert.next({
            messages: 'Form was invalid',
            class: 'danger'
        });
    }

}
