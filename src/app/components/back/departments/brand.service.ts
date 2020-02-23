import { Injectable } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';
import { Params } from '@angular/router';
import { ImageService } from '../../images/image.service';

@Injectable()

export class BrandService {

    private brands: Brand[] = [];
    brandsChanged = new Subject<Brand[]>();

    constructor(
        private http: HttpClient, 
        private imageService: ImageService
    ) {}

    getAllBrands(httpParams: Params): Observable<HttpPaginationResponse> {
        const page = httpParams.page || 1;

        return this.http.get<HttpPaginationResponse>('http://127.0.0.1:8001/api/admin/brands?page=' + page, {
            params: httpParams
        })
        .pipe(
            map(response => {
                response.data = response.data.map(args => {
                    return new Brand(
                        args.id, 
                        args.name
                    );
                });

                return response;
            }),
            tap(response => {
                this.brands = response.data;
            })
        );
    }

    getBrand(id: number): Observable<Brand> {
        return this.http.get<HttpDataResponse>('http://127.0.0.1:8001/api/admin/brands/' + id)
            .pipe(
                map(response => {
                    console.log(response);
                    const args = response.data;

                    this.imageService.setImages(args.images);
                    
                    return new Brand(
                        args.id, 
                        args.name
                    );
                })
            );
    }

    createBrand(brand: Brand): Observable<any> {
        return this.http.post('http://127.0.0.1:8001/api/admin/brands', brand);
    }

    updateBrand(id: number, data): Observable<any> {
        return this.http.patch('http://127.0.0.1:8001/api/admin/brands/' + id, data);
    }

    deleteBrand(id: number): Observable<any> {
        const position = this.brands.findIndex( 
            (brandEl: Brand) => {
                return brandEl.id === id;
            }
        )

        this.brands.splice(position, 1);
        this.brandsChanged.next(this.brands);

        return this.http.delete('http://127.0.0.1:8001/api/admin/brands/' + id);
    }
}