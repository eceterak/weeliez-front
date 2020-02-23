import { Component, Input } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from '../../brand.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: '[app-brand-list-item]',
  templateUrl: './brand-list-item.component.html',
  styleUrls: ['./brand-list-item.component.scss']
})
export class BrandListItemComponent {

    @Input() brand: Brand;

    constructor(
        private brandService: BrandService, 
        private alertService: AlertService
    ) {}

    onDeleteBrand() {
        this.brandService.deleteBrand(this.brand.id).subscribe(
            (_) => {
                this.alertService.alert.next({
                    messages: 'Brand deleted',
                    class: 'success'
                });
            },
            (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
            }
        );
    }

}
