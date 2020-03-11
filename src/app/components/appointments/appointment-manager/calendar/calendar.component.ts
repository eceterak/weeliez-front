import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { MatDialog } from '@angular/material';
import { AppointmentDialogComponent } from '../../appointment-dialog/appointment-dialog.component';
import * as moment from 'moment';
import { AppointmentService } from '../../appointment.service';
import { MonthPickerResponse } from 'src/app/interfaces/montPickerResponse.interface';
import { Department } from 'src/app/models/department.model';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

    appointmentServiceSubscription: Subscription;
    appointmentsTable: CalendarRow[];
    doctor: Doctor;
    department: Department;

    constructor(
        private appointmentService: AppointmentService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.appointmentServiceSubscription = this.appointmentService.detailsChanged.subscribe(
            (response: MonthPickerResponse) => {
                console.log(response.appointmentsTable);
                this.appointmentsTable = response.appointmentsTable;
                this.department = response.department;
                this.doctor = response.doctor;
            }
        );
    }

    ngOnDestroy() {
        this.appointmentServiceSubscription.unsubscribe();
    }

    get slots(): string[] {
        return ['8am', '9am', '10am', '11am', 'Noon', '1pm', '2pm', '3pm', '4pm'];
    }

    onManageAppointment(slot: number, date: moment.Moment, id: number): void {
        this.dialog.open(AppointmentDialogComponent, {
            width: '860px',
            position: {
                top: '50px'
            },
            data: {
                slot: slot,
                date: date,
                doctor: this.doctor,
                department: this.department,
                id: id
            }
        });
    }
}
