import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { Subscription } from 'rxjs';
import { PagerInterface } from 'src/app/interfaces/pager.interface';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

    departments: Department[] = [];
    departmentsSubscription: Subscription;
    pager: PagerInterface;

    constructor(
        private departmentService: DepartmentService,
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
        )

        this.departmentsSubscription = this.departmentService.departmentsChanged.subscribe(
            (departments: Department[]) => {
                this.departments = departments;
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
        this.departmentsSubscription.unsubscribe();
    }

    loadPage(params: Params) {
        this.departmentService.getAllDepartments(params).subscribe(
            (response: HttpPaginationResponse) => {
                this.pager = {
                    links: response.links,
                    meta: response.meta,
                    route: 'departments'
                }

                this.departments = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    onAddDepartment() {
        this.dialog.open(DepartmentDialogComponent, {
            width: '800px',
            position: { 
                top: '50px' 
            }
        });
    }

}
