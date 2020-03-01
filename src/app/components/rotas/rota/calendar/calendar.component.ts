import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RotaService } from '../../rota.service';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { Department } from 'src/app/models/department.model';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { Shift } from 'src/app/models/shift.model';
import { DepartmentService } from 'src/app/components/departments/department.service';
import { Employee } from 'src/app/models/employee.model';

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
    employees: Employee[];
    rows: CalendarRow[] = [];

    constructor(
        private rotaService: RotaService,
        private calendarService: CalendarService,
        private departmentService: DepartmentService
    ) {}

    ngOnInit() {
        this.calendarServiceSubscription = this.calendarService.detailsChanged.subscribe(
            (calendarData: CalendarData) => {
                console.log(calendarData);

                this.rows = [];

                
                this.firstDay = new Date(calendarData.year, calendarData.month, 1).getDay() - 1;
                this.daysInMonth = new Date(calendarData.year, calendarData.month + 1, 0).getDate();
                
                
                calendarData.department.employees.forEach(employee => {
                    this.rows.push(new CalendarRow(employee, this.shiftsFill()));
                });

                this.calendarService.updateRota(this.rows.slice());

                // this.departmentService.getEmployees(calendarData.department.id).subscribe(
                //     (employees: Employee[]) => {
                //         if(employees) {
                //             this.rows = [];

                //             employees.forEach(employee => {
                //                 // if(this.rota.rows) {
                //                 //     const employeePos = this.rota.rows.findIndex(
                //                 //         (row) => {
                //                 //             return row.employee.id == employee.id;
                //                 //         }
                //                 //     )
        
                //                 //     if(employeePos) {
                //                 //         rows.push(this.rota.rows[employeePos]);
                //                 //     } else {
                //                 //         rows.push(new CalendarRow(employee, this.shiftsFill()));
                //                 //     }
                //                 // } else {
                //                 //     rows.push(new CalendarRow(employee, this.shiftsFill()));
                //                 // }

                //                 this.rows.push(new CalendarRow(employee, this.shiftsFill()));
                //             });
        
                //             this.calendarService.updateRota(this.rows.slice());
                //         }
                //     }
                // );
            }
        );

    }

    ngOnDestroy() {
        this.calendarServiceSubscription.unsubscribe();
    }

    get daysInMonthArray(): number[] {
        //return Array(this.daysInMonth).fill(1).map((x, i) => i + 1);
        return Array(7).fill(1).map((x, i) => i + 1);
    }

    // shiftsFill(): Shift[] {
    //     return Array(this.daysInMonth).fill('').map((x, i) => new Shift(i + 1, 12));
    // }

    shiftsFill(): number[] {
        // return Array(this.daysInMonth).fill('').map((x, i) => 0);
        return Array(7).fill(1).map((x, i) => 0);
    }

    onReset() {
        this.rows = [];

        this.calendarService.createRota();
    }
}