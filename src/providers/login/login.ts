import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {OneSignal} from "@ionic-native/onesignal";

@Injectable()
export class LoginProvider {

    constructor(private afDatabse: AngularFireDatabase, public afAuth: AngularFireAuth, private oneSignal: OneSignal) {
        console.log('Hello LoginProvider Provider');
    }


    createProfile(userId, profile, post) {
        profile.adotapet_filtros = {
            "estado":  post.estado,
            "especie": post.especie
        };
        this.oneSignal.getIds().then(data => {
            profile.notificationToken = data.userId;
            this.afDatabse.object('profile/'+ userId).set(profile);
        });
    }

}
