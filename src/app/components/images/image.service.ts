import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Image } from 'src/app/models/image.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()

export class ImageService {
    private images: Image[] = [];
    imagesChanged = new Subject<Image[]>();

    constructor(private http: HttpClient) {}

    upload(file: File, ownerId: number, ownerType: string): Observable<Image> {
        var data = new FormData();
        data.append('image', file);
        data.append('owner_id', ownerId.toString());
        data.append('owner_type', ownerType);

        return this.http.post<Image>('http://127.0.0.1:8001/api/admin/images', data).pipe(
            tap(image => {
                this.images.push(image);

                this.imagesChanged.next(this.images);
            })
        );
    }

    deleteImage(id: number): Observable<any> {
        const position = this.images.findIndex( 
            (imageEl: Image) => {
                return imageEl.id === id;
            }
        )

        this.images.splice(position, 1);
        this.imagesChanged.next(this.images);

        return this.http.delete('http://127.0.0.1:8001/api/admin/images/' + id);
    }

    setImages(images: Image[]) {
        this.images = images;

        this.imagesChanged.next(this.images);
    }
}