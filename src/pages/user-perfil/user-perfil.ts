import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular'
import {AuthProvider} from "../../providers/auth/auth";
import {TranslateService} from "@ngx-translate/core";
import {AngularFireAuth} from "angularfire2/auth";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";

/**
 * Generated class for the UserPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
    priority: 'low'
})
@Component({
    selector: 'page-user-perfil',
    templateUrl: 'user-perfil.html',
})
export class UserPerfilPage {

    section: string = 'one';
    canEnter: boolean = false;

    constructor(public navCtrl: NavController,
                public auth: AuthProvider,
                public afAuth: AngularFireAuth,
                public toastCtrl: ToastController,
                private translate: TranslateService
    ) {

    }

    ionViewCanEnter() {
        this.auth.autenticated.subscribe((value) => {
            let translation: string = this.translate.instant('Faça login para continuar');
            console.log('retorno', value);
            console.log(translation);
            (!value) ? this.canEnter = false : this.canEnter = true;
        });
    }

    logOf(): void {
        this.afAuth.auth.signOut().then(() => {
            localStorage.clear();
            this.navCtrl.push('AdotePage', null, {animation: 'md-transition'});
        });
    }
}
