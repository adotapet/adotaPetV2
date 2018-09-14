import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular'
import {AuthProvider} from "../../providers/auth/auth";
import {TranslateService} from "@ngx-translate/core";
import {AngularFireAuth} from "angularfire2/auth";

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

    constructor(public navCtrl: NavController,
                public auth: AuthProvider,
                public afAuth: AngularFireAuth,
                public toastCtrl: ToastController,
                private translate: TranslateService

                ) {

    }

    ionViewCanEnter() {
        this.auth.getUser().then(user => {
            let translation:string = this.translate.instant('Faça login para continuar');
            let result = !!user;
            console.log('auth',result, user);
            let toast = this.toastCtrl.create({
                message: translation,
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
