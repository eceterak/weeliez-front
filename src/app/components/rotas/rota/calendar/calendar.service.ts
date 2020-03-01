import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Shift } from 'src/app/models/shift.model';
import { Employee } from 'src/app/models/employee.model';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { Rota } from 'src/app/models/rota.model';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CalendarService {
    constructor(private http: HttpClient) {}

    detailsChanged = new Subject<any>();
    rotaChanged = new Subject<any>();
    massDayUpdate = new Subject<any>();
    rota: Rota;
    rows: CalendarRow[];

    setup(formValues: CalendarData) {
        this.rota = new Rota(null, formValues.department, formValues.month, formValues.year);

        this.detailsChanged.next(formValues);
    }

    updateRota(rows: CalendarRow[]) {
        this.rows = rows.slice();
    }

    dayUpdated(day: number, row: number, value: number) {
        // const tt = this.rota.rows.findIndex(
        //     (row) => {
        //         return row.employee.id == employee.id;
        //     }
        // )

        // const pp = this.rota.rows[tt].shifts.findIndex(
        //     (shiftEl) => {
        //         return shiftEl.day == shift.day;
        //     }
        // );

        //console.log('day:' + day + ' row: ' + row + 'value: ' + value);
        this.rows[row].shifts[4] = value;

        console.log(this.rows);
    }

    createRota() {
        // const request = {
        //     month: this.rota.month,
        //     year: this.rota.year,
        //     department_id: this.rota.department.id,
        //     rows: [
                
        //     ]
        // }

        console.log(this.rows);
    }
}