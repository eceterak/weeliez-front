import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { Rota } from 'src/app/models/rota.model';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CalendarService {
    detailsChanged = new Subject<any>();
    
    setup() {}

    updateRota() {}
}