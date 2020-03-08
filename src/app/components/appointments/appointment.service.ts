import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import * as moment from 'moment';

@Injectable()

export class AppointmentService {
    detailsChanged = new Subject<any>();
    daysToDisplay: number = 5;
    table: any[];

    setup(formValues: CalendarData) {
        const date = formValues.date; 

        let table = new Array(this.daysToDisplay);

        for(let i = 0; i < this.daysToDisplay; i++) {
            table[i] = new CalendarRow(moment(date).add(i, 'd').format('YYYY-MM-DD'), new Array(9).fill(1), true);
        }

        this.table = table;

        this.detailsChanged.next(this.table);
    }

    createAppointment(slot: number, date: moment.Moment) {
        const pos = this.table.findIndex(
            tableEl => {
                return tableEl.date == date;
            }
        )

        this.table[pos].slots[slot] = 2;

        this.detailsChanged.next(this.table.slice());
    }
}