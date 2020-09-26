import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from "@angular/fire/auth";
import {OneSignal} from "@ionic-native/onesignal";
import {Geolocation} from "@ionic-native/geolocation";

@Injectable()
export class LoginProvider {

    userLocation: any;

    constructor(private afDb: AngularFireDatabase, public afAuth: AngularFireAuth, private oneSignal: OneSignal, public geolocation: Geolocation) {
        console.log('Hello LoginProvider Provider');
    }


    createProfile(userId): Promise<any> {
        localStorage.setItem('skipIntro', 'true');
        return new Promise((resolve, reject) => {
            this.oneSignal.getIds().then((user) => {
                let promise = this.afDb.object('profile/' + userId).set(user);
                console.log(user, 'onesignal bune');
                resolve(promise);
            }).catch(erro => {
                console.error(erro);
                reject('Nao foi possivel pegar o token de notificação');
            });
        });

    }

}
