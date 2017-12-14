import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';


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
