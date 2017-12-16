import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {database} from "firebase";

@Injectable()
export class AuthProvider {
    constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    }

    getUser() {
        return this.afAuth.auth.currentUser;
    }

    getUserPerfil(userId = null) {
        let id = (userId ? userId : this.getUser().uid);
        try {
            return this.afDb.list('profile/' + id).valueChanges();
        } catch (e) {
            console.log(e);
        }
    }

}

