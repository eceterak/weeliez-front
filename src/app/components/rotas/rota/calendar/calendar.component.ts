import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RotaService } from '../../rota.service';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { Department } from 'src/app/models/department.model';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { Shift } from 'src/app/models/shift.model';

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
    
    rows: any[] = [];

    rota: {
        month: number;
        year: number;
        department: Department;
        rows: any[];
    };

    constructor(
        private rotaService: RotaService,
        private calendarService: CalendarService
    ) {}

    ngOnInit() {
        this.calendarServiceSubscription = this.calendarService.detailsChanged.subscribe(
            (calendarData: CalendarData) => {
                this.rota = {
                    month: calendarData.month,
                    year: calendarData.year,
                    department: calendarData.department,
                    rows: calendarData.rows
                }

                console.log(this.rota);
                
                this.firstDay = new Date(calendarData.year, calendarData.month, 1).getDay() - 1;
                this.daysInMonth = new Date(calendarData.year, calendarData.month + 1, 0).getDate();

                if(calendarData.department) {
                    let rows = [];

                    calendarData.department.employees.forEach(employee => {
                        if(this.rota.rows) {
                            const employeePos = this.rota.rows.findIndex(
                                (row) => {
                                    return row.employee.id == employee.id;
                                }
                            )

                            if(employeePos) {
                                rows.push(this.rota.rows[employeePos]);
                            } else {
                                rows.push(new CalendarRow(employee, this.shiftsFill()));
                            }
                        } else {
                            rows.push(new CalendarRow(employee, this.shiftsFill()));
                        }
                    });

                    this.rota.rows = rows;

                    //this.calendarService.updateRota(rows);
                }
            }
        );

    }

    ngOnDestroy() {
        this.calendarServiceSubscription.unsubscribe();
    }

    get daysInMonthArray(): number[] {
        return Array(this.daysInMonth).fill(1).map((x, i) => i + 1);
    }

    shiftsFill(): Shift[] {
        return Array(this.daysInMonth).fill('').map((x, i) => new Shift(i + 1, 12));
    }

}
