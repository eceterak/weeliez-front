import { Employee } from '../models/employee.model';
import { Shift } from '../models/shift.model';

export class CalendarRow {
    public employee: Employee;
    public shifts: Shift[];

    constructor(employee: Employee, shifts: Shift[]) {
        this.employee = employee;
        this.shifts = shifts;
    }
}