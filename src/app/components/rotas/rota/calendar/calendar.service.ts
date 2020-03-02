import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { Rota } from 'src/app/models/rota.model';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CalendarService {
    detailsChanged = new Subject<any>();
    massDayUpdate = new Subject<any>();
    shiftChanged = new Subject<any>();

    rota: Rota;
    rows: CalendarRow[];
    
    constructor(private http: HttpClient) {}
    
    setup(calendarData: CalendarData) {
        // this.rota = new Rota(
        //     null, 
        //     calendarData.department, 
        //     calendarData.month, 
        //     calendarData.year, 
        //     []
        // );

        // calendarData.department.employees.forEach(employee => {
        //     this.rows.push(new CalendarRow(employee, this.shiftsFill()));
        // });

        this.detailsChanged.next(calendarData);
    }

    updateRota(rows: CalendarRow[]) {
        this.rows = rows.slice();
    }

    // changeShift(day: number, row: number, value: number) {
    //     this.shiftChanged.next({
    //         day: day,
    //         row: row,
    //         value: value
    //     });

    //     //console.log(this.rota.rows);
    // }

    createRota() {
        console.log(this.rota);
    }

    get daysInMonthArray(): number[] {
        //return Array(this.daysInMonth).fill(1).map((x, i) => i + 1);
        return Array(7).fill(1).map((x, i) => i + 1);
    }

    shiftsFill(): number[] {
        //return Array(this.daysInMonth).fill('').map((x, i) => 0);
        return Array(7).fill(1).map((x, i) => 0);
    }
}