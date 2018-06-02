import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {elementDef} from "@angular/core/src/view";

@Injectable()
export class AuthProvider {
    constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    }

    getUser() {
        return this.afAuth.auth.currentUser;
    }

    getUserPerfil(userId = null) {
        let id;
        if (userId) {
            id = userId;
        } else {
            id = this.getUser().uid;
        }
        try {
            return this.afDb.database.ref('profile/' + id);
        } catch (e) {
            console.log(e);
        }
    }

    getUserToken(userId){
        let token;
        this.afDb.database.ref('profile/' + userId + '/notificationToken').once('value', data => {
            token = data.val();
            return token;
        });
    }

}

