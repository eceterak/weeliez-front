import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../../doctor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DoctorDialogComponent } from '../../doctor-dialog/doctor-dialog.component';

@Component({
  selector: '[app-doctor-list-item]',
  templateUrl: './doctor-list-item.component.html',
  styleUrls: ['./doctor-list-item.component.scss']
})
export class DoctorListItemComponent {

    @Input() doctor: Doctor;

    constructor(
        private doctorService: DoctorService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    onDeleteDoctor() {
        this.doctorService.deleteDoctor(this.doctor.id).subscribe(
            (_) => {
                this.snackBar.open('Doctor deleted', '', {
                    horizontalPosition: 'right'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

    onEditDoctor() {
        this.dialog.open(DoctorDialogComponent, {
            width: '800px',
            data: this.doctor.id,
            position: { 
                top: '50px' 
            }
        });
    }
}