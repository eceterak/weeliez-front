import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { PagerInterface } from 'src/app/interfaces/pager.interface';

@Component({
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit, OnDestroy, AfterContentChecked {

    doctors: Doctor[] = [];
    doctorsSubscription: Subscription;
    pager: PagerInterface;

    constructor(
        private doctorService: DoctorService,
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

        this.doctorsSubscription = this.doctorService.doctorsChanged.subscribe(
            (doctors: Doctor[]) => {
                this.doctors = doctors;
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
        this.doctorsSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.doctorService.getAllDoctors(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta
                }

                this.doctors = response.data;
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
