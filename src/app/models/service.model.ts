import { Department } from './department.model';

export class Service {
    id: number;
    name: string;
    department: Department;
    description: string;

    constructor(id: number, name: string, department: Department, description?: string) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.description = description;
    }
}