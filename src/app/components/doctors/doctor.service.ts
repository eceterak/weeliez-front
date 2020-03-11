import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Params } from '@angular/router';
import { ImageService } from '../images/image.service';
import { Doctor } from 'src/app/models/doctor.model';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { Department } from 'src/app/models/department.model';
import { environment } from './../../../environments/environment';
import { Image } from 'src/app/models/image.model';

@Injectable()

export class DoctorService {
    private doctors: Doctor[] = [];
    doctorsChanged = new Subject<Doctor[]>();

    constructor(
        private http: HttpClient, 
        private imageService: ImageService
    ) {}

    getAllDoctors(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>(environment.api + 'doctors?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Doctor(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        new Department(args.department.id, args.department.name)
                    );
                });

                return response;
            }),
            tap(response => {
                this.doctors = response.data;
            })
        );
    }

    getDoctor(id: number): Observable<Doctor> {
        return this.http.get<HttpDataResponse>(environment.api + 'doctors/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;

                    const image = args.images[0] ? new Image(args.images[0].id, args.images[0].url, args.images[0].owner_id, args.images[0].owner_type) : null;
                    
                    return new Doctor(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        new Department(args.department.id, args.department.name),
                        image
                    );
                })
            );
    }

    createDoctor(data: any): Observable<any> {
        return this.http.post(environment.api + 'doctors', data).pipe(
            tap(response => {
                const args = response.data;
                
                this.doctors.push(new Doctor(
                    args.id, 
                    args.name,
                    args.surname,
                    args.title,
                    new Department(args.department.id, args.department.name)
                ));

                this.doctorsChanged.next(this.doctors);
            })
        );
    }

    updateDoctor(id: number, data: any): Observable<any> {
        return this.http.patch<HttpDataResponse>(environment.api + 'doctors/' + id, data).pipe(
            tap(response => {
                const args = response.data;
                
                const doctor = new Doctor(
                    args.id, 
                    args.name,
                    args.surname,
                    args.title,
                    new Department(args.department.id, args.department.name)
                );

                const position = this.doctors.findIndex( 
                    (doctorEl: Doctor) => {
                        return doctorEl.id === doctor.id;
                    }
                )

                this.doctors[position] = doctor;
                this.doctorsChanged.next(this.doctors);
            })
        );
    }

    deleteDoctor(id: number): Observable<any> {
        const position = this.doctors.findIndex( 
            (doctorEl: Doctor) => {
                return doctorEl.id === id;
            }
        )

        this.doctors.splice(position, 1);
        this.doctorsChanged.next(this.doctors);

        return this.http.delete(environment.api + 'doctors/' + id);
    }
}