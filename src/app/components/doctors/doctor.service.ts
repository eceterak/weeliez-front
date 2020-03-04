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

        return this.http.get<HttpPaginationResponse>('http://127.0.0.1:8001/api/doctors?page=' + page, {
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
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/doctors/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;

                    this.imageService.setImages(args.images);
                    
                    return new Doctor(
                        args.id, 
                        args.name,
                        args.surname,
                        args.title,
                        new Department(args.department.id, args.department.name)
                    );
                })
            );
    }

    createDoctor(data: any): Observable<any> {
        return this.http.post('http://127.0.0.1:8001/api/doctors', data);
    }

    updateDoctor(id: number, data): Observable<any> {
        return this.http.patch('http://127.0.0.1:8001/api/doctors/' + id, data);
    }

    deleteDoctor(id: number): Observable<any> {
        const position = this.doctors.findIndex( 
            (doctorEl: Doctor) => {
                return doctorEl.id === id;
            }
        )

        this.doctors.splice(position, 1);
        this.doctorsChanged.next(this.doctors);

        return this.http.delete('http://127.0.0.1:8001/api/doctors/' + id);
    }
}