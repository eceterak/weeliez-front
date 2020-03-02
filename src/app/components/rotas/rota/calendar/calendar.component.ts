import { Component, OnInit, OnDestroy } from '@angular/core';
import { RotaService } from '../../rota.service';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { DepartmentService } from 'src/app/components/departments/department.service';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Rota } from 'src/app/models/rota.model';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

    daysInMonth: number = null;
    firstDay: number = null;
    calendarServiceSubscription: Subscription;
    dayNames: string[] = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];
    rows: CalendarRow[] = [];

    formRows: FormGroup;

    constructor(
        private rotaService: RotaService,
        private calendarService: CalendarService,
        private departmentService: DepartmentService
    ) {}

    ngOnInit() {
        // this.formRows = new FormGroup({
        //     'rows': new FormArray([
        //         new FormGroup({
        //             'employee_id': new FormControl('marek'),
        //             'shifts': new FormArray([
        //                 new FormControl(1), new FormControl(2), new FormControl(3)
        //             ])
        //         }),
        //         new FormGroup({
        //             'employee_id': new FormControl('elon'),
        //             'shifts': new FormArray([
        //                 new FormControl(3), new FormControl(2), new FormControl(1)
        //             ])
        //         })
        //     ])
        // });

        // const rota: Rota = new Rota(
        //     1, 
        //     new Department(1, 'asd'),
        //     2,
        //     2020,
        //     [
        //         new CalendarRow(new Employee(1, 'marek', 'bartula'), [2, 2, 2, 2, 2, 0, 0])
        //     ]
        // );

        // if(rota) {
        //     this.firstDay = new Date(rota.year, rota.month, 1).getDay() - 1;
        //     this.daysInMonth = new Date(rota.year, rota.month + 1, 0).getDate();

        //     const rows = new FormArray([]);

                
        //     rota.rows.forEach(row => {
        //         rows.push(new FormGroup({
        //             'employee_id': new FormControl(row.employee.name + ' ' + row.employee.surname),
        //             'shifts': new FormArray(this.shiftsFill(row.shifts))
        //         }))  
        //     });

        //     this.formRows = new FormGroup({
        //         'rows': rows
        //     });

        //     console.log(this.formRows.get('rows.0.shifts.0'));
        // }

        this.calendarServiceSubscription = this.calendarService.detailsChanged.subscribe(
            (calendarData: CalendarData) => {
                this.firstDay = new Date(calendarData.year, calendarData.month, 1).getDay() - 1;
                this.daysInMonth = new Date(calendarData.year, calendarData.month + 1, 0).getDate();
                
                const rows = new FormArray([]);

                
                calendarData.department.employees.forEach(employee => {
                    rows.push(new FormGroup({
                        'employee_id': new FormControl(employee.name + ' ' + employee.surname),
                        'shifts': new FormArray(this.shiftsFill())
                    }))  
                });

                this.formRows = new FormGroup({
                    'rows': rows
                });
            }
        );
    }

    ngOnDestroy() {
        this.calendarServiceSubscription.unsubscribe();
    }

    get daysInMonthArray(): number[] {
        return Array(this.daysInMonth).fill(1).map((x, i) => i + 1);
        //return Array(7).fill(1).map((x, i) => i + 1);
    }

    shiftsFill(shifts?: number[]): FormControl[] {
        if(shifts) {
            const tt = [];

            shifts.forEach(element => {
                tt.push(new FormControl(element));
            });

            console.log(tt);

            return tt;
        }
        //return Array(this.daysInMonth).fill(1).map((x, i) => new FormControl(0));
        return Array(this.daysInMonth).fill(1).map((x, i) => new FormControl(0));
    }

    get controls() {
        return (<FormArray>this.formRows.get('rows')).controls;
    }

    // onReset() {
    //     this.rows = [];

    //     this.calendarService.createRota();
    // }

    onClick() {
        console.log(this.formRows.value);
    }
}