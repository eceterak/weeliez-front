import { Doctor } from '../models/doctor.model';

export class CalendarRow {
    public doctor: Doctor;
    public appo: any;

    constructor(doctor: Doctor, appo: any) {
        this.doctor = doctor;
        this.appo = appo;
    }
}