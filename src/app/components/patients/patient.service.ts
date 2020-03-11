import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Params } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import * as _moment from 'moment';
import { environment } from './../../../environments/environment';

@Injectable()

export class PatientService {
    private patients: Patient[] = [];
    patientsChanged = new Subject<Patient[]>();

    constructor(
        private http: HttpClient
    ) {}

    getAllPatients(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>(environment.api + 'patients?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Patient(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        args.phone,
                        _moment(args.dateOfBirth)
                    );
                });

                return response;
            }),
            tap(response => {
                this.patients = response.data;
            })
        );
    }

    getSelectPatients(): Observable<HttpDataResponse> {
        return this.http.get<HttpDataResponse>(environment.api + 'patients?clean=1').pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Patient(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        args.phone,
                        _moment(args.dateOfBirth)
                    );
                });

                return response;
            })
        );
    }

    getPatient(id: number): Observable<Patient> {
        return this.http.get<HttpDataResponse>(environment.api + 'patients/' + id)
            .pipe(
                map(response => {
                    const args = response.data;
                    
                    return new Patient(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        args.phone,
                        _moment(args.dateOfBirth)
                    );
                })
            );
    }

    createPatient(data: any): Observable<any> {
        return this.http.post(environment.api + 'patients', data).pipe(
            tap(response => {
                const args = response.data;
                
                this.patients.push(new Patient(
                    args.id, 
                    args.name,
                    args.surname,
                    args.title,
                    args.phone,
                    _moment(args.dateOfBirth)
                ));

                this.patientsChanged.next(this.patients);
            })
        );
    }

    updatePatient(id: number, data: any): Observable<any> {
        return this.http.patch<HttpDataResponse>(environment.api + 'patients/' + id, data).pipe(
            tap(response => {
                const args = response.data;
                
                const patient = new Patient(
                    args.id, 
                    args.name,
                    args.surname,
                    args.title,
                    args.phone,
                    _moment(args.dateOfBirth)
                );

                const position = this.patients.findIndex( 
                    (patientEl: Patient) => {
                        return patientEl.id === patient.id;
                    }
                )

                this.patients[position] = patient;
                this.patientsChanged.next(this.patients);
            })
        );
    }

    deletePatient(id: number): Observable<any> {
        const position = this.patients.findIndex( 
            (patientEl: Patient) => {
                return patientEl.id === id;
            }
        )

        this.patients.splice(position, 1);
        this.patientsChanged.next(this.patients);

        return this.http.delete(environment.api + 'patients/' + id);
    }
}