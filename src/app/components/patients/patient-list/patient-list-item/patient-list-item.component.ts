import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from '../../patient.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientDialogComponent } from '../../patient-dialog/patient-dialog.component';

@Component({
    selector: '[app-patient-list-item]',
    templateUrl: './patient-list-item.component.html',
    styleUrls: ['./patient-list-item.component.scss']
})

export class PatientListItemComponent {

    @Input() patient: Patient;

    constructor(
        private patientService: PatientService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    onDeletePatient() {
        this.patientService.deletePatient(this.patient.id).subscribe(
            (_) => {
                this.snackBar.open('Patient deleted', '', {
                    horizontalPosition: 'right'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

    onEditPatient() {
        this.dialog.open(PatientDialogComponent, {
            width: '600px',
            data: this.patient.id,
            position: { 
                top: '50px' 
            }
        });
    }
}