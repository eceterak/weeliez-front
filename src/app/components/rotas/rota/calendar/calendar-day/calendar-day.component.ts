import { Component, OnInit, Input } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { CalendarService } from '../calendar.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

    @Input() shift: Shift;
    @Input() employee: Employee;

    constructor(private calendarService: CalendarService) {}

    ngOnInit() {
        this.calendarService.massDayUpdate.subscribe(
            (data) => {
                if(data.employee.id == this.employee.id) {
                    console.log('tt');
                }
            }
        )
    }

    onSelectShift() {
        this.calendarService.dayUpdated(this.shift, this.employee);
    }

}
