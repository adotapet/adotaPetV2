import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular'
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the UserPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-user-perfil',
    templateUrl: 'user-perfil.html',
})
export class UserPerfilPage {

    section: string = 'one';
    canEnter: boolean;

    constructor(public navCtrl: NavController, public auth: AuthProvider, public toastCtrl: ToastController) {

    }

    ionViewCanEnter() {
        this.auth.getUser().then(user => {
            let result = !!user;
            let toast = this.toastCtrl.create({
                message: 'Faça login para continuar',
                duration: 2000,
                position: 'bottom'
            });
            if (!result) {
                toast.present();
                this.canEnter = false;
            } else {
                this.canEnter = true;
            }
        })
    }
}
