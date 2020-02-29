import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Shift } from 'src/app/models/shift.model';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
    providedIn: 'root'
})

export class CalendarService {
    detailsChanged = new BehaviorSubject<any>({});
    rotaChanged = new Subject<any>();
    massDayUpdate = new Subject<any>();

    rows: any[];

    rota: {};

    dayUpdated(shift: Shift, employee: Employee) {
        const tt = this.rows.findIndex(
            (row) => {
                return row.employee.id == employee.id;
            }
        )

        const pp = this.rows[tt].shifts.findIndex(
            (shiftEl) => {
                return shiftEl.day == shift.day;
            }
        );

        this.rows[tt].shifts[pp].value = 22;

        this.rotaChanged.next(this.rows);

        this.massDayUpdate.next({employee: employee, day: shift.day + 1});
    }

    updateRota(rows: any[]) {
        this.rows = rows;

        this.rotaChanged.next(rows);
    }
}