import { Department } from '../models/department.model';
import { Doctor } from '../models/doctor.model';
import { Moment } from 'moment';

export class CalendarData {
    doctor: Doctor;
    department: Department;
    date: Moment;
}