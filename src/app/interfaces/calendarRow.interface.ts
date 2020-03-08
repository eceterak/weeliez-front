import { Doctor } from '../models/doctor.model';

export class CalendarRow {
    public date: string;
    public slots: number[];
    public isAvailable: boolean;

    constructor(date: string, slots: number[], isAvailable?: boolean) {
        this.date = date;
        this.slots = slots;
        this.isAvailable = isAvailable;
    }
}