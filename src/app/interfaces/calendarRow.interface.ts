import { Employee } from '../models/employee.model';

export class CalendarRow {
    public employee: Employee;
    public shifts: number[];

    constructor(employee: Employee, shifts: number[]) {
        this.employee = employee;
        this.shifts = shifts;
    }
}