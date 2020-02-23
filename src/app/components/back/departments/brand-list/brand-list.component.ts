import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from 'src/app/models/brand.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { PagerInterface } from 'src/app/interfaces/pager.interface';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit, OnDestroy, AfterContentChecked {

    brands: Brand[] = [];
    brandsSubscription: Subscription;
    pager: PagerInterface;

    displayedColumns: string[] = ['name'];

    constructor(
        private brandsService: BrandService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(
            (params: Params) => {
                this.loadPage(params);
            }
        );

        this.brandsSubscription = this.brandsService.brandsChanged.subscribe(
            (brands: Brand[]) => {
                this.brands = brands;
            }
        )
    }

    ngAfterContentChecked() {
        if(history.state.message) {
            this.alertService.alert.next({
                messages: history.state.message,
                class: 'success'
            });
        }
    }

    ngOnDestroy() {
        this.brandsSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.brandsService.getAllBrands(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta
                }

                this.brands = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    onSearchTermUpdate(searchParams: Params) {
        const params = {};

        for(let key in searchParams) {
            const value = searchParams[key];

            if(value) {
                params[key] = value.toString();
            }
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params || {}
        });

    }
}
