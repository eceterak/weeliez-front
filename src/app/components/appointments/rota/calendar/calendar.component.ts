import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { DepartmentService } from 'src/app/components/departments/department.service';
import { Doctor } from 'src/app/models/doctor.model';
import { MatDialog } from '@angular/material';
import { AppointmentModalComponent } from '../../appointment-modal/appointment-modal.component';
import * as moment from 'moment';
import { AppointmentService } from '../../appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

    date: moment.Moment;
    daysToDisplay: number = 5;
    calendarServiceSubscription: Subscription;
    table: any[];
    appointmentModalRef: any;

    constructor(
        private appointmentService: AppointmentService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.calendarServiceSubscription = this.appointmentService.detailsChanged.subscribe(
            (table) => {
                this.table = table;
            }
        );

        // const appointments = {
        //     "2020-03-09": [
        //         {
        //             id: 14,
        //             service_id: 1,
        //             doctor_id: 1,
        //             patient_id: 1,
        //             slot: 1
        //         },
        //         {
        //             id: 23,
        //             service_id: 3,
        //             doctor_id: 1,
        //             patient_id: 2,
        //             slot: 5
        //         },
        //         {
        //             id: 32,
        //             service_id: 3,
        //             doctor_id: 1,
        //             patient_id: 2,
        //             slot: 7
        //         }
        //     ],
        //     "2020-03-12": [
        //         {
        //             id: 112,
        //             service_id: 1,
        //             doctor_id: 1,
        //             patient_id: 1,
        //             slot: 0
        //         },
        //         {
        //             id: 221,
        //             service_id: 3,
        //             doctor_id: 1,
        //             patient_id: 2,
        //             slot: 2
        //         },
        //         {
        //             id: 313,
        //             service_id: 3,
        //             doctor_id: 1,
        //             patient_id: 2,
        //             slot: 3
        //         }
        //     ]
        // };

        // const firstDay = 9;
        // const daysTotal = 9;
        // const restrictedDays = [1, 3];

        // const table = [];

        // for(let i = 0; i < daysTotal; i++) {
        //     const currentDay = i + firstDay;
        //     const mnt = moment([2020, 2, currentDay]);
        //     const t = mnt.format('YYYY-MM-DD');

        //     if(mnt.day() != 0) {
        //         const slots = new Array(9).fill(null);
    
        //         if(appointments.hasOwnProperty(t)) {
        //             for(let i = 0; i < 9; i++) {
        //                 const pos = appointments[t].findIndex(
        //                     (appointmentEl) => {
        //                         return appointmentEl.slot == i;
        //                     }
        //                 )
                            
        //                 if(pos !== -1) {
        //                     slots[i] = appointments[t][pos].id;
        //                 }
        //             }
        //         }
    
        //         table[i] = new CalendarRow(t, slots, true);
        //     } else {
        //         table[i] = new CalendarRow(t, [], false);
        //     }


        // }

        // this.table = table;
    }

    ngOnDestroy() {
        this.calendarServiceSubscription.unsubscribe();
    }

    get daysInMonthArray(): number[] {
        //return Array(this.daysInMonth).fill(1).map((x, i) => i + 1);
        return Array(5).fill(1).map((x, i) => i + 1);
    }

    shiftsFill(shifts?: number[]): FormControl[] {
        if(shifts) {
            const tt = [];

            shifts.forEach(element => {
                tt.push(new FormControl(element));
            });

            console.log(tt);

            return tt;
        }
        //return Array(this.daysInMonth).fill(1).map((x, i) => new FormControl(0));
        return Array(5).fill(1).map((x, i) => new FormControl(0));
    }

    // createTable() {
    //     const appointments = {
    //         '05-03-2020': [
    //             {
    //                 id: 1,
    //                 service_id: 1,
    //                 doctor_id: 1,
    //                 patient_id: 1,
    //                 slot: 1
    //             },
    //             {
    //                 id: 1,
    //                 service_id: 1,
    //                 doctor_id: 1,
    //                 patient_id: 2,
    //                 slot: 5
    //             },

    //         ],
    //         '06-03-2020': [
    //             {
    //                 id: 1,
    //                 service_id: 1,
    //                 doctor_id: 1,
    //                 patient_id: 1,
    //                 slot: 1
    //             },
    //             {
    //                 id: 1,
    //                 service_id: 1,
    //                 doctor_id: 1,
    //                 patient_id: 2,
    //                 slot: 3
    //             },
    //         ]
    //     }

    //     const days = 5;
    //     const firstDay = 6;

    //     const table = [];

    //     for(let d = firstDay; d < (firstDay + days); d++) {
    //         const day = new Date(2020, 2, d);
    //         console.log(day);
    //         //table[d] = d;
    //     }

    //     //console.log(table);

    // }

    get slots(): string[] {
        return ['8am', '9am', '10am', '11am', 'Noon', '1pm', '2pm', '3pm', '4pm'];
    }

    get rr(): string[] {
        return ['Thu 05-03-2020', 'Thu 06-03-2020', 'Thu 07-03-2020', 'Thu 08-03-2020', 'Thu 09-03-2020'];
    }

    onManageAppointment(slot: number, date: moment.Moment) {
        this.appointmentModalRef = this.dialog.open(AppointmentModalComponent, {
            width: '800px',
            data: {
                slot: slot,
                date: date
            }
        });
    }
}
