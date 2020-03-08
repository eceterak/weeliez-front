import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Subscription } from 'rxjs';
import { PagerInterface } from 'src/app/interfaces/pager.interface';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent implements OnInit, OnDestroy {

    patients: Patient[];
    patientsSubscription: Subscription;
    pager: PagerInterface;

    constructor(
        private patientService: PatientService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(
            (params: Params) => {
                this.loadPage(params);
            }
        );

        this.patientsSubscription = this.patientService.patientsChanged.subscribe(
            (patients: Patient[]) => {
                this.patients = patients;
            }
        )
    }

    ngOnDestroy() {
        this.patientsSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.patientService.getAllPatients(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta,
                    route: '/patients'
                }

                this.patients = response.data;
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

    onAddPatient() {
        this.dialog.open(PatientDialogComponent, {
            width: '800px',
            position: { 
                top: '50px' 
            }
        });
    }
}
