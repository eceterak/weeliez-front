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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

    daysInMonth: number = null;
    firstDay: number = null;
    calendarServiceSubscription: Subscription;
    dayNames: string[] = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];
    rows: CalendarRow[] = [
        new CalendarRow(new Doctor(1, 'marek', 'bartula', 'dr'), [
            [{ name: 'Surgery', time: '10:00' }, { name: 'Dinner', time: '13:00'} ],
            [{ name: 'Surgery', time: '10:00' }, { name: 'Dinner', time: '13:00'} ],
            [{ name: 'Surgery', time: '10:00' }, { name: 'Dinner', time: '13:00'} ],
            [{ name: 'Surgery', time: '10:00' }, { name: 'Dinner', time: '13:00'} ],
            [{ name: 'Surgery', time: '10:00' }, { name: 'Dinner', time: '13:00'} ]
        ])
    ];

    constructor(
        private calendarService: CalendarService,
        private departmentService: DepartmentService
    ) {}

    ngOnInit() {
        this.calendarServiceSubscription = this.calendarService.detailsChanged.subscribe(
            (calendarData: CalendarData) => {
                // calendarData.department.doctors.forEach(doctor => {
                //     rows.push(new FormGroup({
                //         'doctor_id': new FormControl(doctor.name + ' ' + doctor.surname),
                //         'shifts': new FormArray(this.shiftsFill())
                //     }))  
                // });
                // this.departmentService.getDoctors(calendarData.department.id).subscribe(
                //     (doctors: Doctor[]) => {
                //         console.log(doctors);
                //     }
                // )


                // console.log(calendarData.department);

                // this.firstDay = new Date(calendarData.year, calendarData.month, 1).getDay() - 1;
                // this.daysInMonth = new Date(calendarData.year, calendarData.month + 1, 0).getDate();
                
                // const rows = new FormArray([]);

                
                // calendarData.department.doctors.forEach(doctor => {
                //     rows.push(new FormGroup({
                //         'doctor_id': new FormControl(doctor.name + ' ' + doctor.surname),
                //         'shifts': new FormArray(this.shiftsFill())
                //     }))  
                // });

                // this.formRows = new FormGroup({
                //     'rows': rows
                // });
            }
        );
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
}
