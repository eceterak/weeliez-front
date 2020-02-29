import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { PagerInterface } from 'src/app/interfaces/pager.interface';

@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterContentChecked {

    employees: Employee[] = [];
    employeesSubscription: Subscription;
    pager: PagerInterface;

    constructor(
        private employeeService: EmployeeService,
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

        this.employeesSubscription = this.employeeService.employeesChanged.subscribe(
            (employees: Employee[]) => {
                this.employees = employees;
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
        this.employeesSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.employeeService.getAllEmployees(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta
                }

                this.employees = response.data;
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
