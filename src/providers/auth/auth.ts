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

    getUserPerfil(userId = null) {
       let id = (userId ? userId : this.getUser().uid);
        try {
            return database().ref().child('profile/' + id);
        }catch (e){
            console.log(e);
        }
    }

}

