import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { Params } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Doctor } from 'src/app/models/doctor.model';
import { Service } from 'src/app/models/service.model';
import { environment } from './../../../environments/environment';
import { Image } from 'src/app/models/image.model';

@Injectable()

export class DepartmentService {
    private departments: Department[] = [];
    departmentsChanged = new Subject<Department[]>();

    constructor(private http: HttpClient) {}

    getAllDepartments(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>(environment.api + 'departments?page=' + page, {
            params: httpParams
        }).pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Department(args.id, args.name, args.doctors);
                });

                return response;
            }),
            tap(response => {
                this.departments = response.data
            })
        );
    }

    getSelectDepartments(): Observable<HttpDataResponse> {
        return this.http.get<HttpDataResponse>(environment.api + 'departments?clean=1').pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Department(args.id, args.name);
                });

                return response;
            })
        );
    }

    getDepartment(id: number): Observable<Department> {
        return this.http.get<HttpDataResponse>(environment.api + 'departments/' + id)
        .pipe(
            map(response => {
                const args = response.data;
                
                return new Department(args.id, args.name);
            })
        );
    }

    createDepartment(department: Department): Observable<any> {
        return this.http.post(environment.api + 'departments', department).pipe(
            tap(response => {
                const args = response.data;
                
                this.departments.push(new Department(
                    args.id, 
                    args.name
                ));

                this.departmentsChanged.next(this.departments);
            })
        );
    }

    updateDepartment(id: number, data): Observable<any> {
        return this.http.patch(environment.api + 'departments/' + id, data).pipe(
            tap(response => {
                const args = response.data;
                
                const department = new Department(args.id, args.name);

                const position = this.departments.findIndex( 
                    (departmentEl: Department) => {
                        return departmentEl.id === department.id;
                    }
                )

                this.departments[position] = department;
                this.departmentsChanged.next(this.departments);
            })
        );
    }

    deleteDepartment(id: number): Observable<any> {
        const position = this.departments.findIndex( 
            (departmentEl: Department) => {
                return departmentEl.id === id;
            }
        )

        this.departments.splice(position, 1);
        this.departmentsChanged.next(this.departments);

        return this.http.delete(environment.api + 'departments/' + id);
    }

    getDoctors(id: number): Observable<Doctor[]> {
        return this.http.get<HttpDataResponse>(environment.api + 'departments/' + id + '/doctors').pipe(
            map(response => {
                let data = response.data.map((args: any) => {
                    if(args.images[0]) {
                        const image = args.images[0];

                        return new Doctor(
                            args.id, 
                            args.name,
                            args.surname,
                            args.title,
                            null,
                            new Image(image.id, image.url, image.owner_id, image.owner_type)
                        );
                    } else {
                        return new Doctor(
                            args.id, 
                            args.name,
                            args.surname,
                            args.title,
                            null
                        );
                    }
                });

                return data;
            })
        );
    }

    getServices(id: number): Observable<Service[]> {
        return this.http.get<HttpDataResponse>(environment.api + 'departments/' + id + '/services').pipe(
            map(response => {
                let data = response.data.map((args: any) => {
                    return new Service(args.id, args.name, args.department);
                });

                return data;
            })
        );
    }
}
