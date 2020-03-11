import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { Subscription } from 'rxjs';
import { PagerInterface } from 'src/app/interfaces/pager.interface';
import { ServiceService } from '../services.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { MatDialog } from '@angular/material';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

    services: Service[];
    servicesSubscription: Subscription;
    pager: PagerInterface;

    constructor(
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(
            (params: Params) => {
                this.loadPage(params);
            }
        );

        this.servicesSubscription = this.serviceService.servicesChanged.subscribe(
            (services: Service[]) => {
                this.services = services;
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
        this.servicesSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.serviceService.getAllServices(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta,
                    route: '/services'
                }

                this.services = response.data;
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

    onAddService() {
        this.dialog.open(ServiceDialogComponent, {
            width: '800px',
            position: { 
                top: '50px' 
            }
        });
    }

}
