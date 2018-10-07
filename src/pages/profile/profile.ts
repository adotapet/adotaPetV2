import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OneSignal} from "@ionic-native/onesignal";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})

export class ProfilePage {

    userId: string;
    profile: FormGroup;
    pushToken: any;

    constructor(public navParams: NavParams, public navCtrl: NavController,
                public alert: AlertController, public afDb: AngularFireDatabase, public formBuilder: FormBuilder,
                private oneSignal: OneSignal, private firebaseAnalytics: FirebaseAnalytics
    ) {
        this.userId = this.navParams.get('userId');
        this.profile = this.formBuilder.group({
            nome: ['', Validators.required],
            pushToken: ['', Validators.required],
        });
        this.firebaseAnalytics.setCurrentScreen('page-profile').then(() => console.log('current screen'));
    }

    ionViewDidLoad() {
        this.oneSignal.getIds().then((signalUser) => {
            console.log("OneSignal User ID:", signalUser);
            this.pushToken = signalUser.pushToken;
            this.profile.value.pushToken = signalUser.pushToken;
            console.log("PROFILE FINAL:", this.profile.value);

        }, error => {
            console.log('Nao foi possivel pegar o token de notificação', error);
        });
    }


    createProfile(userId) {
        if (this.pushToken) {
            this.afDb.object('profile/' + userId).set(this.profile.value).then(() => {
                this.firebaseAnalytics.logEvent('profile_created', {user: this.profile.value.nome})
                    .then((res: any) => console.log(res))
                    .catch((error: any) => console.error(error));
                this.profile.reset();
                this.navCtrl.setRoot('TabsControllerPage', null, {animation: 'md-transition'})
            });
        } else {
            alert('Nao foi possivel pegar o token da notificação');
        }

    }

}