import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { DepartmentService } from '../../departments/department.service';
import { Department } from 'src/app/models/department.model';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';

@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    editMode: boolean = false;
    employeeForm: FormGroup;
    employee: Employee;
    getErrorMessage = UtilitiesService.getErrorMessage;
    departments: Department[] = [];

    constructor(
        private employeeService: EmployeeService, 
        private departmentService: DepartmentService,
        private route: ActivatedRoute, 
        private router: Router,
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
        );

        this.departmentService.getAllDepartments({}).subscribe(
            (response: HttpPaginationResponse) => {
                this.departments = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    initForm(id: number) {
        this.employeeForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'surname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'department': new FormControl(null, [Validators.required])
        });

        if(this.editMode) {
            this.employeeService.getEmployee(id).subscribe(
                (employee: Employee) => {
                    this.employee = employee;

                    this.employeeForm.get('name').setValue(this.employee.name);
                    this.employeeForm.get('surname').setValue(this.employee.surname);
                    this.employeeForm.get('department').setValue(this.employee.department);
                }
            );
        }
    }

    onFormSubmit() {
        console.log(this.employeeForm.value);

        if(this.employeeForm.valid) {
            if(this.editMode) {
                this.employeeService.updateEmployee(this.employee.id, this.employeeForm.value).subscribe(
                    (_) => {
                        this.router.navigate(['/employees'], { state: { message: 'Employee updated' } });
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.setErrors(errorResponse.error.errors);
                    }
                );
            } else {
                //const newEmployee = new Employee(null, this.employeeForm.value.name, this.employeeForm.value.surname, new Department(1, 'asd'));
    
                this.employeeService.createEmployee(this.employeeForm.value).subscribe(
                    (_) => {
                        this.router.navigate(['/employees'], { state: { message: 'Employee created' } });
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

    displayDepartmentName(department: Department): string {
        return department && department.name ? department.name : '';
    }

    setErrors(errors: object) {
        for(let prop in errors) {
            if(this.employeeForm.contains(prop)) {
                this.employeeForm.controls[prop].setErrors({ http: errors[prop] });
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