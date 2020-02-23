import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from '../image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {

    @Input() ownerId: number;
    @Input() ownerType: number;
    private images: Image[];
    private imagesChangedSubscription: Subscription;

    constructor(private imageService: ImageService) {}

    ngOnInit() {
        this.imagesChangedSubscription = this.imageService.imagesChanged.subscribe(
            (images: Image[]) => {
                this.images = images;
            }
        );
    }

    ngOnDestroy() {
        this.imagesChangedSubscription.unsubscribe();
    }
}
