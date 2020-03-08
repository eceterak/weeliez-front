import { Component, OnInit, Inject } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { DepartmentService } from '../../departments/department.service';
import { Department } from 'src/app/models/department.model';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './doctor-dialog.component.html',
    styleUrls: ['./doctor-dialog.component.scss']
})
export class DoctorDialogComponent implements OnInit {

    editMode: boolean = false;
    doctorForm: FormGroup;
    doctor: Doctor;
    getErrorMessage = UtilitiesService.getErrorMessage;
    departments: Department[] = [];
    titles: string[] = [
        'Dr', 'PhD', 'Ph.D', 'Trainee'
    ];

    constructor(
        private doctorService: DoctorService, 
        private departmentService: DepartmentService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) private id,
        private dialogRef: MatDialogRef<DoctorDialogComponent>,
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
        this.doctorForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'surname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'title': new FormControl(null, [Validators.required]),
            'department': new FormControl(null, [Validators.required])
        });

        if(this.id) {
            this.editMode = true;

            this.doctorService.getDoctor(this.id).subscribe(
                (doctor: Doctor) => {
                    this.doctor = doctor;

                    this.doctorForm.get('name').setValue(this.doctor.name);
                    this.doctorForm.get('surname').setValue(this.doctor.surname);
                    this.doctorForm.get('title').setValue(this.doctor.title);
                    this.doctorForm.get('department').setValue(this.doctor.department);
                }
            );
        }
    }

    onFormSubmit(): void {
        if(this.doctorForm.valid) {
            if(this.editMode) {
                this.doctorService.updateDoctor(this.doctor.id, this.doctorForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Doctor updated!', '', {
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
                this.doctorService.createDoctor(this.doctorForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Doctor created!', '', {
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
            if(this.doctorForm.contains(prop)) {
                this.doctorForm.controls[prop].setErrors({ http: errors[prop] });
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