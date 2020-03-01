import { Department } from './department.model';
import { CalendarRow } from '../interfaces/calendarRow.interface';

export class Rota {
    public id?: number;
    public department: Department;
    public month: number;
    public year: number;
    public rows: CalendarRow[];

    constructor(id: number, department: Department, month: number, year: number, rows?: CalendarRow[]) {
        this.id = id;
        this.department = department;
        this.month = month;
        this.year = year;
        this.rows = rows;
    }
}