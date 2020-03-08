import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar/calendar.service';
import { Rota } from 'src/app/models/rota.model';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.scss']
})
export class RotaComponent implements OnInit {

    editMode: boolean = false;
    rota: Rota;

    constructor(
        private calendarService: CalendarService
    ) {}

    ngOnInit() {}

    onSubmitRota() {
        if(this.editMode) {

        } else {
            this.calendarService.createRota();
        }
    }
}