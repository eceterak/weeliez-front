import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { CalendarService } from '../calendar.service';
import { Employee } from 'src/app/models/employee.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnDestroy {

    @Input() parentForm: FormGroup;
    @Input() row: number;
    @Input() day: number;
    sub: Subscription;

    constructor(private calendarService: CalendarService) {}

    ngOnInit() {
        //this.dayValue = new FormControl(this.value);

        this.sub = this.control.valueChanges.subscribe(
            (val) => {
                console.log(val);

                // this.calendarService.shiftChanged.next({
                //     day: this.day,
                //     row: this.row,
                //     value: val
                // });
            }
        );

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

    get control(): FormControl {
        return (<FormControl>this.parentForm.get(['rows', this.row, 'shifts', this.day]));
    }
}
