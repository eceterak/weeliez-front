import { Employee } from './employee.model';

export class Department {
    public id: number;
    public name: string;
    public employees: Employee[];

    constructor(id: number, name: string, employees?: Employee[]) {
        this.id = id;
        this.name = name;
        this.employees = employees;
    }
}