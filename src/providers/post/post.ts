import {Injectable} from '@angular/core';


@Injectable()
export class PostProvider {

    posts = [];
    location: string;
    constructor() {
        this.location = 'BR';
    }

    getPetsRef(){
        return `${this.location}/adocao/pets`;
    }
}
