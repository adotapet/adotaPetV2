import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {database} from "firebase";
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class PostProvider {

    posts = [];

    constructor(public http: HttpClient, private database: AngularFireDatabase) {
        //posts = database.object('BR/adocao/pets');
    }

}
