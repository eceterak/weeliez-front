import { Doctor } from './doctor.model';
import { Service } from './service.model';
import { Moment } from 'moment';
import { Patient } from './patient.model';

export class Appointment {
    id: number;
    doctor: Doctor;
    patient: Patient;
    service: Service;
    slot: number;
    date: Moment;

    constructor(id: number, doctor: Doctor, patient: Patient, service: Service, slot: number, date: Moment) {
        this.id = id;
        this.doctor = doctor;
        this.patient = patient;
        this.service = service;
        this.slot = slot;
        this.date = date;
    }
}