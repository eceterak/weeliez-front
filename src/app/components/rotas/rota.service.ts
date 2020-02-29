import { Injectable } from '@angular/core';
import { Rota } from 'src/app/models/rota.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { map, tap } from 'rxjs/operators';
import { Department } from 'src/app/models/department.model';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';

@Injectable()

export class RotaService {
    private rotas: Rota[] = [];
    rotasChanged = new Subject<Rota[]>();

    constructor(private http: HttpClient) {}

    getAllRotas(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>('http://127.0.0.1:8001/api/rotas?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Rota(
                        args.id,
                        new Department(args.department.id, args.department.name),
                        args.month, 
                        args.year
                    );
                });

                return response;
            }),
            tap(response => {
                this.rotas = response.data;
            })
        );
    }

    getRota(id: number): Observable<Rota> {
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/rotas/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;
                    
                    return new Rota(
                        args.id,
                        new Department(args.department.id, args.department.name),
                        args.month, 
                        args.year
                    );
                })
            );
    }

    createRota(data: any): Observable<any> {
        return this.http.post('http://127.0.0.1:8001/api/rotas', data);
    }

    updateRota(id: number, data): Observable<any> {
        return this.http.patch('http://127.0.0.1:8001/api/rotas/' + id, data);
    }

    deleteEmployee(id: number): Observable<any> {
        const position = this.rotas.findIndex( 
            (rotaEl: Rota) => {
                return rotaEl.id === id;
            }
        )

        this.rotas.splice(position, 1);
        this.rotasChanged.next(this.rotas);

        return this.http.delete('http://127.0.0.1:8001/api/rotas/' + id);
    }
}