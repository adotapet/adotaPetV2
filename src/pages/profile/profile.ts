import {NavController, NavParams, AlertController} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {Component} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})

export class ProfilePage {

    userId: string;

    constructor(public navParams: NavParams, public navCtrl: NavController, private login: LoginProvider,
                public alert: AlertController, public afDb: AngularFireDatabase
    ) {
        this.userId = this.navParams.get('userId');

    }


    createProfile() {
        this.login.createProfile(this.userId).then(() => {
            console.log('returned');
            this.navCtrl.setRoot('TabsControllerPage');
        })
    }


}