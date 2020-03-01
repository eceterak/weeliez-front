import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from '../../departments/department.service';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
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