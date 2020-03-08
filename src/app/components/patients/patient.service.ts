import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Params } from '@angular/router';
import { ImageService } from '../images/image.service';
import { Patient } from 'src/app/models/patient.model';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';

@Injectable()

export class PatientService {
    private patients: Patient[] = [];
    patientsChanged = new Subject<Patient[]>();

    constructor(
        private http: HttpClient, 
        private imageService: ImageService
    ) {}

    getAllPatients(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>('http://127.0.0.1:8001/api/patients?page=' + page, {
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
                        args.dateOfBirth
                    );
                });

                return response;
            }),
            tap(response => {
                this.patients = response.data;
            })
        );
    }

    getPatient(id: number): Observable<Patient> {
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/patients/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;

                    this.imageService.setImages(args.images);
                    
                    return new Patient(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        args.phone,
                        args.dateOfBirth
                    );
                })
            );
    }

    createPatient(data: any): Observable<any> {
        return this.http.post('http://127.0.0.1:8001/api/patients', data).pipe(
            tap(response => {
                const args = response.data;
                
                this.patients.push(new Patient(
                    args.id, 
                    args.name,
                    args.surname,
                    args.title,
                    args.phone,
                    args.dateOfBirth
                ));

                this.patientsChanged.next(this.patients);
            })
        );
    }

    updatePatient(id: number, data: any): Observable<any> {
        return this.http.patch<HttpDataResponse>('http://127.0.0.1:8001/api/patients/' + id, data).pipe(
            tap(response => {
                const args = response.data;
                
                const patient = new Patient(
                    args.id, 
                    args.name,
                    args.surname,
                    args.title,
                    args.phone,
                    args.dateOfBirth
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

        return this.http.delete('http://127.0.0.1:8001/api/patients/' + id);
    }
}