import { Component, OnInit, OnDestroy } from '@angular/core';
import { RotaService } from '../../rota.service';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendarData.interface';
import { CalendarRow } from 'src/app/interfaces/calendarRow.interface';
import { DepartmentService } from 'src/app/components/departments/department.service';
import { Employee } from 'src/app/models/employee.model';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

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
        //         this.row
        //     ])
        // })

        this.formRows = new FormGroup({
            'rows': new FormArray([
                new FormGroup({
                    'employee_id': new FormControl('marek'),
                    'shifts': new FormArray([
                        new FormControl(1), new FormControl(2), new FormControl(3)
                    ])
                }),
                new FormGroup({
                    'employee_id': new FormControl('elon'),
                    'shifts': new FormArray([
                        new FormControl(1), new FormControl(2), new FormControl(3)
                    ])
                })
            ])
        });

        console.log(this.formRows);

        this.rows = [new CalendarRow(new Employee(1, 'marek', 'bartula'), [1, 1, 3, 1, 1, 1, 1])];

        this.calendarServiceSubscription = this.calendarService.detailsChanged.subscribe(
            (rows) => {
                //this.rows = rows;

                //console.log(Object.is(this.rows, this.calendarService.rota.rows));
            }
        );

        // this.calendarServiceSubscription = this.calendarService.detailsChanged.subscribe(
        //     (calendarData: CalendarData) => {
        //         this.firstDay = new Date(calendarData.year, calendarData.month, 1).getDay() - 1;
        //         this.daysInMonth = new Date(calendarData.year, calendarData.month + 1, 0).getDate();
                
        //         this.rows = [];
                
        //         calendarData.department.employees.forEach(employee => {
        //             this.rows.push(new CalendarRow(employee, this.shiftsFill()));
        //         });

        //         //this.calendarService.updateRota(this.rows.slice());

        //         // this.departmentService.getEmployees(calendarData.department.id).subscribe(
        //         //     (employees: Employee[]) => {
        //         //         if(employees) {
        //         //             this.rows = [];

        //         //             employees.forEach(employee => {
        //         //                 // if(this.rota.rows) {
        //         //                 //     const employeePos = this.rota.rows.findIndex(
        //         //                 //         (row) => {
        //         //                 //             return row.employee.id == employee.id;
        //         //                 //         }
        //         //                 //     )
        
        //         //                 //     if(employeePos) {
        //         //                 //         rows.push(this.rota.rows[employeePos]);
        //         //                 //     } else {
        //         //                 //         rows.push(new CalendarRow(employee, this.shiftsFill()));
        //         //                 //     }
        //         //                 // } else {
        //         //                 //     rows.push(new CalendarRow(employee, this.shiftsFill()));
        //         //                 // }

        //         //                 this.rows.push(new CalendarRow(employee, this.shiftsFill()));
        //         //             });
        
        //         //             this.calendarService.updateRota(this.rows.slice());
        //         //         }
        //         //     }
        //         // );
        //     }
        // );
    }

    ngOnDestroy() {
        this.calendarServiceSubscription.unsubscribe();
    }

    get daysInMonthArray(): number[] {
        //return Array(this.daysInMonth).fill(1).map((x, i) => i + 1);
        return Array(7).fill(1).map((x, i) => i + 1);
    }

    shiftsFill(): number[] {
        //return Array(this.daysInMonth).fill('').map((x, i) => 0);
        return Array(7).fill(1).map((x, i) => 0);
    }

    get controls() {
        return (<FormArray>this.formRows.get('rows')).controls;
    }

    get row(): FormGroup {
        return new FormGroup({
            'employee_id': new FormControl('marek'),
            'shifts': new FormArray([
                this.shifts
            ])
        });
    }

    get shifts(): FormControl {
        return new FormControl(1);
    }

    // onReset() {
    //     this.rows = [];

    //     this.calendarService.createRota();
    // }

    onClick() {
        console.log(this.formRows.value);
    }
}