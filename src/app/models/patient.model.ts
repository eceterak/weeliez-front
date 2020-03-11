import { Moment } from 'moment';

export class Patient {
    public id?: number;
    public name: string;
    public surname: string;
    public title: string;
    public phone: number;
    public dateOfBirth: Moment;

    constructor(id: number, name: string, surname: string, title: string, phone: number, dateOfBirth: Moment) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.title = title;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
    }

    getFullName() {
        return this.name + ' ' + this.surname;
    }

    getDateOfBirth() {
        return this.dateOfBirth.format('MM-DD-YYYY');
    }
}