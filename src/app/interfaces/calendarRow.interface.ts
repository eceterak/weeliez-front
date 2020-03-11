import { Moment } from 'moment';

export class CalendarRow {
    public date: Moment;
    public slots: number[];
    public isAvailable: boolean;

    constructor(date: Moment, slots: number[], isAvailable?: boolean) {
        this.date = date;
        this.slots = slots;
        this.isAvailable = isAvailable;
    }

    getDate(): string {
        return this.date.format('YYYY-MM-DD');
    }
}