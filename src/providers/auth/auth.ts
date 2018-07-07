import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {


    constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase,) {
        this.fireAuth = firebase.auth();
    }

    public fireAuth: any;

    private uid: string;


    resetPassword(email: string): any {
        return this.fireAuth.sendPasswordResetEmail(email);
    }

    setUid(uid: string): void {
        this.uid = uid;
    }

    getUid(): string {
        return this.uid;
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

