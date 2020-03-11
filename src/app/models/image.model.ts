import { environment } from './../../environments/environment';

export class Image {
    id: number;
    owner_id: number;
    owner_type: string;
    url: string;

    constructor(id: number, url: string, owner_id: number, owner_type) {
        this.id = id;
        this.url = url;
        this.owner_id = owner_id;
        this.owner_type = owner_type;
    }

    getUrl() {
       return environment.aws + this.url;
    }
}