import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from 'src/app/models/image.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable()

export class ImageService {
    private images: Image[] = [];
    imagesChanged = new Subject<Image[] | null>();

    constructor(private http: HttpClient) {}

    upload(file: File, ownerId: number, ownerType: string): Observable<Image> {
        var data = new FormData();
        data.append('image', file);
        data.append('owner_id', ownerId.toString());
        data.append('owner_type', ownerType);

        return this.http.post<Image>(environment.api + 'images', data).pipe(
            tap(image => {
                this.images.push(new Image(image.id, image.url, image.owner_id, image.owner_type));

                this.imagesChanged.next(this.images);
            })
        );
    }

    deleteImage(id: number): Observable<any> {
        this.imagesChanged.next(null);

        return this.http.delete(environment.api + 'images/' + id);
    }

    setImages(images: Image[]) {
        images.forEach(image => {
            this.images.push(new Image(image.id, image.url, image.owner_id, image.owner_type));
        });

        this.imagesChanged.next(this.images);
    }
}