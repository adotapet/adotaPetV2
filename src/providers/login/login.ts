import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {errorHandler} from "@angular/platform-browser/src/browser";

@Injectable()
export class LoginProvider {

    constructor(private afDatabse: AngularFireDatabase, public afAuth: AngularFireAuth) {
        console.log('Hello LoginProvider Provider');
    }


    createProfile(userId, profile) {
       this.afDatabse.object(`profile/${userId}`).set(profile);
    }

}
