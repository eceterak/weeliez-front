import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { DepartmentService } from '../department.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

    editMode: boolean = false;
    departmentForm: FormGroup;
    department: Department;
    getErrorMessage = UtilitiesService.getErrorMessage;

    constructor(
        private departmentService: DepartmentService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                const id = +params.id || null;

                if(id) {
                    this.editMode = true;
                }

                this.initForm(id);
            }
        )
    }

    initForm(id: number) {
        this.departmentForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)])
        });

        if(this.editMode) {
            this.departmentService.getDepartment(id).subscribe(
                (department: Department) => {
                    this.department = department;

                    this.departmentForm.get('name').setValue(this.department.name);
                }
            )
        }
    }

    onFormSubmit() {
        if(this.departmentForm.valid) {
            if(this.editMode) {
                this.departmentService.updateEmployee(this.department.id, this.departmentForm.value).subscribe(
                    (_) => {
                        this.router.navigate(['/departments'], { state: { message: 'Department updated' } });
                    },
                    (errorResponse: HttpErrorResponse) => {
                        console.log(errorResponse);
                    }
                );
            } else {
                const newDepartment = new Department(null, this.departmentForm.value.name);
    
                this.departmentService.createDepartment(newDepartment).subscribe(
                    (_) => {
                        this.router.navigate(['/departments'], { state: { message: 'Department created '}})
                    },
                    (errorResponse: HttpErrorResponse) => {
                        console.log(errorResponse);
                    }
                );
            }
        }
    }

}
