import { Department } from '../models/department.model';
import { Doctor } from '../models/doctor.model';
import { CalendarRow } from './calendarRow.interface';

export class MonthPickerResponse {
    appointmentsTable: CalendarRow[];
    department: Department;
    doctor: Doctor;
}