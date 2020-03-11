import { Department } from './department.model';
import { Image } from './image.model';

export class Doctor {
    public id?: number;
    public name: string;
    public surname: string;
    public title: string;
    public department: Department;
    public image: Image;

    constructor(id: number, name: string, surname: string, title: string, department?: Department, image?: Image) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.title = title;
        this.department = department;
        this.image = image;
    }

    getFullName() {
        return this.title + ' ' + this.name + ' ' + this.surname;
    }
}