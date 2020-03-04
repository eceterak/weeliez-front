import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/components/departments/department.service';
import { CalendarService } from '../calendar/calendar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Department } from 'src/app/models/department.model';
import { HttpDataResponse } from 'src/app/interfaces/httpDataResponse.interface';

@Component({
  selector: 'app-calendar-month-picker',
  templateUrl: './calendar-month-picker.component.html',
  styleUrls: ['./calendar-month-picker.component.scss']
})
export class CalendarMonthPickerComponent implements OnInit {
    rotaForm: FormGroup;
    currentMonth: number = new Date().getMonth();
    currentYear: number = new Date().getFullYear(); 
    daysInMonth: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    departments: Department[];
    getErrorMessage = UtilitiesService.getErrorMessage;
    months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    constructor(
        private departmentService: DepartmentService,
        private calendarService: CalendarService
    ) {}

    ngOnInit() {
        this.initForm();

        this.departmentService.getAllDepartments({}).subscribe(
            (response: HttpDataResponse) => {
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
    }

    displayDepartmentName(department: Department): string {
        return department && department.name ? department.name : '';
    }

    get years(): number[] {
        return Array(5).fill(1).map((x, i) => this.currentYear + i);
    }
}