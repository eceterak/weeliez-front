import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { DepartmentService } from '../../departments/department.service';
import { Department } from 'src/app/models/department.model';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';

@Component({
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

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
        private route: ActivatedRoute, 
        private router: Router,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                const id = +params.id || null;

                if(id) {
                    this.editMode = true;
                }

                this.initForm(id);
            }
        );

        this.departmentService.getSelectDepartments().subscribe(
            (response: HttpDataResponse) => {
                this.departments = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    initForm(id: number) {
        this.doctorForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'surname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'title': new FormControl(null, [Validators.required]),
            'department': new FormControl(null, [Validators.required])
        });

        if(this.editMode) {
            this.doctorService.getDoctor(id).subscribe(
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

    onFormSubmit() {
        if(this.doctorForm.valid) {
            if(this.editMode) {
                this.doctorService.updateDoctor(this.doctor.id, this.doctorForm.value).subscribe(
                    (_) => {
                        this.router.navigate(['/doctors'], { state: { message: 'Doctor updated' } });
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            } else {
                this.doctorService.createDoctor(this.doctorForm.value).subscribe(
                    (_) => {
                        this.router.navigate(['/doctors'], { state: { message: 'Doctor created' } });
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

    setErrors(errors: object) {
        for(let prop in errors) {
            if(this.doctorForm.contains(prop)) {
                this.doctorForm.controls[prop].setErrors({ http: errors[prop] });
            }
        }

        this.setAlert();
    }

    setAlert() {
        this.alertService.alert.next({
            messages: 'Form was invalid',
            class: 'danger'
        });
    }
}