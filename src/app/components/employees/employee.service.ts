import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Params } from '@angular/router';
import { ImageService } from '../images/image.service';
import { Employee } from 'src/app/models/employee.model';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { Department } from 'src/app/models/department.model';

@Injectable()

export class EmployeeService {
    private employees: Employee[] = [];
    employeesChanged = new Subject<Employee[]>();

    constructor(
        private http: HttpClient, 
        private imageService: ImageService
    ) {}

    getAllEmployees(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>('http://127.0.0.1:8001/api/employees?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Employee(
                        args.id, 
                        args.name,
                        args.surname,
                        new Department(args.department.id, args.department.name)
                    );
                });

                return response;
            }),
            tap(response => {
                this.employees = response.data;
            })
        );
    }

    getEmployee(id: number): Observable<Employee> {
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/employees/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;

                    this.imageService.setImages(args.images);
                    
                    return new Employee(
                        args.id, 
                        args.name,
                        args.surname,
                        new Department(args.department.id, args.department.name)
                    );
                })
            );
    }

    createEmployee(data: any): Observable<any> {
        return this.http.post('http://127.0.0.1:8001/api/employees', data);
    }

    updateEmployee(id: number, data): Observable<any> {
        return this.http.patch('http://127.0.0.1:8001/api/employees/' + id, data);
    }

    deleteEmployee(id: number): Observable<any> {
        const position = this.employees.findIndex( 
            (employeeEl: Employee) => {
                return employeeEl.id === id;
            }
        )

        this.employees.splice(position, 1);
        this.employeesChanged.next(this.employees);

        return this.http.delete('http://127.0.0.1:8001/api/employees/' + id);
    }
}