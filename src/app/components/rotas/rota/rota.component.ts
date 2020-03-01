import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from '../../departments/department.service';
import { HttpPaginationResponse } from 'src/app/interfaces/httpPaginationResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CalendarService } from './calendar/calendar.service';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.scss']
})
export class RotaComponent implements OnInit {

    editMode: boolean = false;
    rotaForm: FormGroup;
    departments: Department[] = [];
    currentMonth: number;
    currentYear: number;
    getErrorMessage = UtilitiesService.getErrorMessage;
    months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    constructor(
        private departmentService: DepartmentService,
        private calendarService: CalendarService
    ) {}

    ngOnInit() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();

        this.initForm();

        this.departmentService.getAllDepartments({}).subscribe(
            (response: HttpPaginationResponse) => {
                this.departments = response.data;
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );

        this.rotaForm.valueChanges.subscribe(
            (formValues) => {
                if(formValues.department) {
                    this.calendarService.setup(formValues);
                }
            }
        );
    }

    initForm(): void {
        this.rotaForm = new FormGroup({
            'month': new FormControl(this.currentMonth, [Validators.required]),
            'year': new FormControl(this.currentYear, [Validators.required]),
            'department': new FormControl(null, [Validators.required])
        });

        // const emp = new Employee(1, 'marek', 'bartula');

        // this.calendarService.detailsChanged.next({
        //     month: 2,
        //     year: 2020,
        //     department: new Department(3, "Writing Pog", [emp]),
        //     rows: [
        //         new CalendarRow(emp, [new Shift(1, 1), new Shift(2, 1), new Shift(3, 1), new Shift(4, 1), new Shift(5, 1), new Shift(6, 1), new Shift(7, 1)])
        //     ]
        // });
    }

    displayDepartmentName(department: Department): string {
        return department && department.name ? department.name : '';
    }

    get years(): number[] {
        let yearsArr: number[] = [];

        for(let i = this.currentYear; i < this.currentYear + 5; i++) {
            yearsArr.push(i);
        }

        return yearsArr;
    }

    onSaveRota() {
        this.calendarService.createRota();
    }
}
