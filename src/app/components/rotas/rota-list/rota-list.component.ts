import { Component, OnInit } from '@angular/core';
import { Rota } from 'src/app/models/rota.model';
import { Subscription } from 'rxjs';
import { PagerInterface } from 'src/app/interfaces/pager.interface';
import { RotaService } from '../rota.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './rota-list.component.html',
  styleUrls: ['./rota-list.component.scss']
})

export class RotaListComponent implements OnInit {

    rotas: Rota[] = [];
    rotasSubscription: Subscription;
    pager: PagerInterface;

    constructor(
        private rotaService: RotaService,
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

        this.rotasSubscription = this.rotaService.rotasChanged.subscribe(
            (rotas: Rota[]) => {
                this.rotas = rotas;
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
        this.rotasSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.rotaService.getAllRotas(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta
                }

                this.rotas = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }
}