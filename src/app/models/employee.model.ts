import { Department } from './department.model';

export class Employee {
    public id?: number;
    public name: string;
    public surname: string;
    public department: Department;

    constructor(id: number, name: string, surname: string, department?: Department) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.department = department;
    }
}