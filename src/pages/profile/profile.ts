import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OneSignal} from "@ionic-native/onesignal";

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})

export class ProfilePage {

    userId: string;
    profile: FormGroup;
    pushToken: any;

    constructor(public navParams: NavParams, public navCtrl: NavController,
                public alert: AlertController, public afDb: AngularFireDatabase, public formBuilder: FormBuilder, private oneSignal: OneSignal
    ) {
        this.userId = this.navParams.get('userId');
        this.profile = this.formBuilder.group({
            nome: ['', Validators.required],
            pushToken: ['', Validators.required],
        });
    }

    ionViewDidLoad() {
        this.oneSignal.getIds().then((signalUser) => {
            console.log("OneSignal User ID:", signalUser);
            this.pushToken = signalUser.pushToken;
            this.profile.value.pushToken = signalUser.pushToken;
            //this.profile.setValue({'pushToken': signalUser.pushToken});
            // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
            console.log("PROFILE FINAL:", this.profile.value);

        }, error => {
            console.log('Nao foi possivel pegar o token de notificação', error);
        });
    }


    createProfile(userId) {
        if (this.pushToken) {
            this.afDb.object('profile/' + userId).set(this.profile.value).then(() => {
                this.profile.reset();
                this.navCtrl.setRoot('TabsControllerPage', null, {animation: 'md-transition'})
            });
        } else {
            alert('Nao foi possivel pegar o token da notificação');
        }

    }

}