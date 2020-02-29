import { Department } from './department.model';

export class Rota {
    public id: number;
    public department: Department;
    public month: number;
    public year: number;

    constructor(id: number, department: Department, month: number, year: number) {
        this.id = id;
        this.department = department;
        this.month = month;
        this.year = year;
    }
}