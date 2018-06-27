import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {OneSignal} from "@ionic-native/onesignal";
import {Geolocation} from "@ionic-native/geolocation";

@Injectable()
export class LoginProvider {

    userLocation: any;

    constructor(private afDatabse: AngularFireDatabase, public afAuth: AngularFireAuth, private oneSignal: OneSignal, public geolocation: Geolocation) {
        console.log('Hello LoginProvider Provider');
    }


    createProfile(userId, profile, post) {

        this.geolocation.getCurrentPosition().then((position) => {
            this.userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
        profile.adotapet_filtros = {
            "estado": post.estado,
            "especie": post.especie
        };
        profile.location = this.userLocation;

        this.oneSignal.getIds().then(data => {
            profile.notificationToken = data.userId;
            this.afDatabse.object('profile/' + userId).set(profile);
        });
    }

}
