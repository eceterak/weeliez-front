import { Department } from './department.model';

export class Doctor {
    public id?: number;
    public name: string;
    public surname: string;
    public title: string;
    public department: Department;

    constructor(id: number, name: string, surname: string, title: string, department?: Department) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.title = title;
        this.department = department;
    }

    getFullName() {
        return this.title + ' ' + this.name + ' ' + this.surname;
    }
}