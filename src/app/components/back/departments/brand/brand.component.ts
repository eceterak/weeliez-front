import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from '../brand.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

    editMode: boolean = false;
    brandForm: FormGroup;
    brand: Brand;
    getErrorMessage = UtilitiesService.getErrorMessage;

    constructor(
        private brandService: BrandService, 
        private route: ActivatedRoute, 
        private router: Router,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.brand = new Brand(1, 'suzuki');

                const id = +params.id || null;

                if(id) {
                    this.editMode = true;
                }

                this.initForm(id);
            }
        )
    }

    initForm(id: number) {
        this.brandForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(3)])
        });

        if(this.editMode) {
            this.brandService.getBrand(id).subscribe(
                (brand: Brand) => {
                    this.brand = brand;

                    this.setFormValues();
                }
            );
        }
    }

    setFormValues() {
        this.brandForm.get('name').setValue(this.brand.name);
    }

    onFormSubmit() {
        if(this.brandForm.valid) {
            if(this.editMode) {
                this.brandService.updateBrand(this.brand.id, this.brandForm.value).subscribe(
                    (_) => {
                        this.router.navigate(['/admin/brands'], { state: { message: 'Brand updated' } });
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            } else {
                const newBrand = new Brand(null, this.brandForm.value.name);
    
                this.brandService.createBrand(newBrand).subscribe(
                    (_) => {
                        this.router.navigate(['/admin/brands'], { state: { message: 'Brand created' } });
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            }
        } else {
            this.setAlert();
        }
    }

    setErrors(errors: object) {
        for(let prop in errors) {
            if(this.brandForm.contains(prop)) {
                console.log(prop);
                this.brandForm.controls[prop].setErrors({ http: errors[prop] });
            }
        }

        this.setAlert();
    }

    setAlert() {
        this.alertService.alert.next({
            messages: 'Form was invalid',
            class: 'danger'
        });
    }
}