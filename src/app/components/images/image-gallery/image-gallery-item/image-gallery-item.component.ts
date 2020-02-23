import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from '../../image.service';

@Component({
    selector: 'app-image-gallery-item',
    templateUrl: './image-gallery-item.component.html',
    styleUrls: ['./image-gallery-item.component.scss']
})
export class ImageGalleryItemComponent {

    @Input() image: Image;
    
    constructor(private imageService: ImageService) {}

    onDeleteImage() {
        this.imageService.deleteImage(this.image.id).subscribe();
    }
}