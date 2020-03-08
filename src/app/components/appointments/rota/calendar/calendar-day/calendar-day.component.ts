import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppointmentModalComponent } from '../../../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

    @Input() data: any;
    appointmentModalRef: MatDialogRef<AppointmentModalComponent>;

    constructor(
        private calendarService: CalendarService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        console.log(this.data);
    }

    onNewAppointment(): void {
        this.appointmentModalRef = this.dialog.open(AppointmentModalComponent, {
            width: '800px',
            data: {
                appointments: this.data
            }
        });
    }
}
