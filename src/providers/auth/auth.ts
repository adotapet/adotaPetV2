import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {database} from "firebase";

@Injectable()
export class AuthProvider {
    constructor(public afAuth: AngularFireAuth) {
    }

    getUser() {
        return this.afAuth.auth.currentUser;
    }

    getUserPerfil(userId) {
        try {
            return database().ref().child('profile/' + userId);
        }catch (e){
            console.log(e);
        }
    }

}

