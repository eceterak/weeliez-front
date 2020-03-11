import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import * as moment from 'moment';
import { MonthPickerResponse } from 'src/app/interfaces/montPickerResponse.interface';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Appointment } from 'src/app/models/appointment.model';
import { environment } from './../../../environments/environment';

@Injectable()

export class AppointmentService {
    detailsChanged = new Subject<MonthPickerResponse>();
    daysToDisplay: number = 5;
    appointmentsTable: CalendarRow[];

    constructor(private http: HttpClient) {}

    setup(formValues: CalendarData) {
        const date = formValues.date;

        this.http.get<HttpDataResponse>(environment.api + 'doctors/' + formValues.doctor.id + '/appointments?date=' + date.format('YYYY-MM-DD')).pipe(
            // map(response => {
            //     console.log(response);
            // }),
            // tap(response => {
                
            // })
        ).subscribe(
            (response) => {
                const appointments = response.data;

                let table = new Array(this.daysToDisplay);

                for(let i = 0; i < this.daysToDisplay; i++) {
                    const slots = new Array(9).fill(null);
                    const cDate = moment(date).add(i, 'd');

                    if(cDate.day() != 0) {
                        const t = cDate.format('YYYY-MM-DD');

                        if(appointments.hasOwnProperty(t)) {
                            for(let i = 0; i < 9; i++) {
                                const pos = appointments[t].findIndex(
                                    (appointmentEl) => {
                                        return appointmentEl.slot == i;
                                    }
                                )
                                    
                                if(pos !== -1) {
                                    slots[i] = appointments[t][pos].id;
                                }
                            }
                        }
                    }

                    const holiday = cDate.day() != 0;

                    table[i] = new CalendarRow(cDate, slots, holiday);

                }

                this.appointmentsTable = table;

                this.detailsChanged.next({
                    appointmentsTable: this.appointmentsTable.slice(),
                    doctor: formValues.doctor,
                    department: formValues.department
                });
            }
        );
    }

    getAppointment(id: number): Observable<Appointment> {
        return this.http.get<HttpDataResponse>(environment.api + 'appointments/' + id).pipe(
            map(response => {
                const args = response.data;
                
                return new Appointment(args.id, args.doctor, args.patient, args.service, args.slot, moment(args.date));
            })
        );
    }

    createAppointment(slot: number, date: moment.Moment, doctor: Doctor, data: any) {
        return this.http.post<HttpDataResponse>(environment.api + 'appointments', {
            doctor_id: doctor.id,
            slot: slot,
            date: date.format('YYYY-MM-DD'),
            service_id: data.service.id,
            patient_id: data.patient.id
        }).pipe(
            tap(response => {
                console.log(response);

                const pos = this.appointmentsTable.findIndex(
                    tableEl => {
                        return tableEl.date == date;
                    }
                );

                this.appointmentsTable[pos].slots[slot] = response.data.id;

                //this.detailsChanged.next(this.appointmentsTable.slice());
            })
        );
    }

    updateAppointment(id: number, slot: number, date: moment.Moment, doctor: Doctor, data: any) {
        return this.http.patch<HttpDataResponse>(environment.api + 'appointments/' + id, {
            doctor_id: doctor.id,
            slot: slot,
            date: date.format('YYYY-MM-DD'),
            service_id: data.service.id,
            patient_id: data.patient.id
        }).pipe(
            tap(response => {
                console.log(response);

                // const pos = this.appointmentsTable.findIndex(
                //     tableEl => {
                //         return tableEl.date == date;
                //     }
                // );

                // this.appointmentsTable[pos].slots[slot] = response.data.id;

                //this.detailsChanged.next(this.appointmentsTable.slice());
            })
        );
    }

    deleteAppointment(id: number, date: any, slot: number): Observable<any> {
        const pos = this.appointmentsTable.findIndex(
            tableEl => {
                return tableEl.date == date;
            }
        );

        this.appointmentsTable[pos].slots[slot] = null;

        return this.http.delete(environment.api + 'appointments/' + id);
    }
}