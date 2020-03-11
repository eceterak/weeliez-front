import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Params } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { environment } from './../../../environments/environment';

@Injectable()

export class ServiceService {
    private services: Service[] = [];
    servicesChanged = new Subject<Service[]>();

    constructor(
        private http: HttpClient
    ) {}

    getAllServices(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>(environment.api + 'services?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Service(args.id, args.name, args.department, args.description);
                });

                return response;
            }),
            tap(response => {
                this.services = response.data;
            })
        );
    }

    getService(id: number): Observable<Service> {
        return this.http.get<HttpDataResponse>(environment.api + 'services/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;
                    
                    return new Service(args.id, args.name, args.department, args.description);
                })
            );
    }

    createService(data: any): Observable<any> {
        return this.http.post(environment.api + 'services', data).pipe(
            tap(response => {
                const args = response.data;
                
                this.services.push(new Service(args.id, args.name, args.department, args.description));

                this.servicesChanged.next(this.services);
            })
        );
    }

    updateService(id: number, data: any): Observable<any> {
        return this.http.patch<HttpDataResponse>(environment.api + 'services/' + id, data).pipe(
            tap(response => {
                const args = response.data;
                
                const service = new Service(args.id, args.name, args.department, args.description);

                const position = this.services.findIndex( 
                    (serviceEl: Service) => {
                        return serviceEl.id === service.id;
                    }
                )

                this.services[position] = service;
                this.servicesChanged.next(this.services);
            })
        );
    }

    deleteService(id: number): Observable<any> {
        const position = this.services.findIndex( 
            (serviceEl: Service) => {
                return serviceEl.id === id;
            }
        )

        this.services.splice(position, 1);
        this.servicesChanged.next(this.services);

        return this.http.delete(environment.api + 'services/' + id);
    }
}