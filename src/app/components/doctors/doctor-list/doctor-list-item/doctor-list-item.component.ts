import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../../doctor.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { DoctorComponent } from '../../doctor/doctor.component';

@Component({
  selector: '[app-doctor-list-item]',
  templateUrl: './doctor-list-item.component.html',
  styleUrls: ['./doctor-list-item.component.scss']
})
export class DoctorListItemComponent {

    @Input() doctor: Doctor;

    constructor(
        private doctorService: DoctorService, 
        private alertService: AlertService,
        private dialog: MatDialog
    ) {}

    onDeleteDoctor() {
        this.doctorService.deleteDoctor(this.doctor.id).subscribe(
            (_) => {
                this.alertService.alert.next({
                    messages: 'Doctor deleted',
                    class: 'success'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

    onEditDoctor() {
        this.dialog.open(DoctorComponent, {
            width: '800px',
            data: {
                doc: this.doctor
            }
        });
    }
}