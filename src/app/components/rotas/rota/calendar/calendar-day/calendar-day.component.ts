import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { CalendarService } from '../calendar.service';
import { Employee } from 'src/app/models/employee.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnDestroy {

    @Input() day: number;
    @Input() row: number;
    @Input() value: number;
    dayValue: FormControl;
    sub: Subscription;

    constructor(private calendarService: CalendarService) {}

    ngOnInit() {
        this.dayValue = new FormControl(this.value);

        this.sub = this.dayValue.valueChanges.subscribe(
            (val) => {
                this.calendarService.dayUpdated(this.day, this.row, val);
            }
        )

        // this.calendarService.massDayUpdate.subscribe(
        //     (data) => {
        //         if(data.employee.id == this.employee.id) {
        //             console.log('tt');
        //         }
        //     }
        // )
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
