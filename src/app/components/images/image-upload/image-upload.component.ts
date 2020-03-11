import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Image } from 'src/app/models/image.model';
import { ImageService } from '../image.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

    @Input() private ownerId: number;
    @Input() private ownerType: string;
    @Input() private maxSize: number = 1024;

    constructor(
        private imageService: ImageService,
        private alertService: AlertService
    ) {}

    onFileChange(e: any): void {
        const files = e.target.files;
        console.log(files);

        if(files.length > 0) {
            for(let i = 0; i < files.length; i++) {
                let file = files[i];

                if(file.type.match('image.*')) {
                    if(this.checkFileSize(file)) {
                        this.imageService.upload(file, this.ownerId, this.ownerType).subscribe(
                            (_) => {
                                this.alertService.alert.next({
                                    messages: 'Image uploaded',
                                    class: 'success'
                                });
                            },
                            (errorResponse: HttpErrorResponse) => {
                                this.alertService.alert.next({
                                    messages: errorResponse.error.error,
                                    class: 'danger'
                                });
                            }
                        );
                    } else {
                        this.alertService.alert.next({
                            messages: "Max file size is: " + this.maxSize / 1024  + " mb",
                            class: 'danger'
                        });
                    }
                } else {
                    this.alertService.alert.next({
                        messages: 'Wrong file type',
                        class: 'danger'
                    });
                }
            }
        }
    }

    checkFileSize(file: File): boolean {
        return (file.size / this.maxSize / this.maxSize) < 1;
    }
}