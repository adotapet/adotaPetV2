import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    profile = [];

    constructor(public navParams: NavParams, public navCtrl: NavController, private login: LoginProvider) {
        console.log('profile.ts')
    }

    createProfile() {
        //cria o perfil e direciona pra home.
        this.login.createProfile(this.navParams.get('userId'), this.profile);
        console.log('perifl criado');
        this.navCtrl.setRoot(TabsControllerPage);
    }

}
