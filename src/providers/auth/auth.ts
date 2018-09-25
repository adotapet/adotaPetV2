import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {Observable} from "rxjs";

@Injectable()
export class AuthProvider {


    constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase,) {
        this.fireAuth = firebase.auth();
    }

    public fireAuth: any;


    resetPassword(email: string): any {
        return this.fireAuth.sendPasswordResetEmail(email);
    }

    get autenticated(): Observable<any> {

        return this.afAuth.authState

    }


    getUser(): Promise<any> {
        return new Promise((resolve) => {
            let currentUser = this.afAuth.auth.currentUser;
            resolve(currentUser);
        })
    }

    getUserPerfil(userId = null) {
        let id;
        if (userId) {
            id = userId;
        } else {
            this.getUser().then(user => {
                id = user.uid;
            });
        }
        try {
            return this.afDb.database.ref('profile/' + id);
        } catch (e) {
            console.log(e);
        }
    }

}

