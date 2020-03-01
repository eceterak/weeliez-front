import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { Params } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Employee } from 'src/app/models/employee.model';

@Injectable()

export class DepartmentService {
    private departments: Department[] = [];
    departmentsChanged = new Subject<Department[]>();

    constructor(private http: HttpClient) {}

    getAllDepartments(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>('http://127.0.0.1:8001/api/departments?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Department(args.id, args.name, args.employees);
                });

                return response;
            }),
            tap(response => {
                this.departments = response.data
            })
        );
    }

    getDepartment(id: number) {
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/departments/' + id)
        .pipe(
            map(response => {
                console.log(response);
                const args = response.data;
                
                return new Department(args.id, args.name);
            })
        );
    }

    createDepartment(department: Department): Observable<any> {
        return this.http.post('http://127.0.0.1:8001/api/departments', department);
    }

    updateEmployee(id: number, data): Observable<any> {
        return this.http.patch('http://127.0.0.1:8001/api/departments/' + id, data);
    }

    deleteDepartment(id: number): Observable<any> {
        const position = this.departments.findIndex( 
            (departmentEl: Department) => {
                return departmentEl.id === id;
            }
        )

        this.departments.splice(position, 1);
        this.departmentsChanged.next(this.departments);

        return this.http.delete('http://127.0.0.1:8001/api/departments/' + id);
    }

    getEmployees(id: number): Observable<Employee[]> {
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/departments/' + id + '/employees')
        .pipe(
            map(response => {
                let data = response.data.map((args: any) => {
                    return new Employee(
                        args.id, 
                        args.name,
                        args.surname
                    );
                });

                return data;
            })
        )
    }
}
