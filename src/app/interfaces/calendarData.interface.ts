import { Department } from '../models/department.model';
import { CalendarRow } from './calendarRow.interface';

export class CalendarData {
    month: number;
    year: number;
    department: Department;
    rows: CalendarRow[]
}