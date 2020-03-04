import { Doctor } from './doctor.model';

export class Department {
    public id: number;
    public name: string;
    public doctors: Doctor[];

    constructor(id: number, name: string, doctors?: Doctor[]) {
        this.id = id;
        this.name = name;
        this.doctors = doctors;
    }
}