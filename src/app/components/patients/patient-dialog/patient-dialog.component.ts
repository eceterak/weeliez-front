import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { PatientService } from '../patient.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-patient-dialog',
    templateUrl: './patient-dialog.component.html',
    styleUrls: ['./patient-dialog.component.scss']
})

export class PatientDialogComponent implements OnInit {

    editMode: boolean = false;
    patientForm: FormGroup;
    patient: Patient;
    getErrorMessage = UtilitiesService.getErrorMessage;
    titles: string[] = [
        'mr', 'mrs'
    ];

    constructor(
        private patientService: PatientService, 
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) private id,
        private dialogRef: MatDialogRef<PatientDialogComponent>,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm(): void {
        this.patientForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'surname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'title': new FormControl(null, [Validators.required]),
            'phone': new FormControl(null, [Validators.required]),
            'dateOfBirth': new FormControl(null, [Validators.required])
        });

        if(this.id) {
            this.editMode = true;

            this.patientService.getPatient(this.id).subscribe(
                (patient: Patient) => {
                    this.patient = patient;

                    this.patientForm.get('name').setValue(this.patient.name);
                    this.patientForm.get('surname').setValue(this.patient.surname);
                    this.patientForm.get('title').setValue(this.patient.title);
                    this.patientForm.get('phone').setValue(this.patient.phone);
                    this.patientForm.get('dateOfBirth').setValue(this.patient.dateOfBirth);
                }
            );
        }
    }

    onFormSubmit(): void {
        if(this.patientForm.valid) {
            //console.log(this.datePipe.transform(this.patientForm.get('dateOfBirth').value, 'dd-MM-yyyy'));

            if(this.editMode) {
                this.patientService.updatePatient(this.patient.id, this.patientForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Patient updated!', '', {
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
                this.patientService.createPatient(this.patientForm.value).subscribe(
                    (_) => {
                        this.snackBar.open('Patient created!', '', {
                            horizontalPosition: 'right',
                            politeness: 'assertive'
                        });

                        this.dialogRef.close();
                    },
                    (errorResponse: HttpErrorResponse) => {
                        console.log(errorResponse);
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            }
        } else {
            this.setAlert();
        }
    }

    setErrors(errors: object): void {
        for(let prop in errors) {
            if(this.patientForm.contains(prop)) {
                this.patientForm.controls[prop].setErrors({ http: errors[prop] });
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