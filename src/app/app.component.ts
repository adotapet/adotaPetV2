import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsControllerPage} from "../pages/tabs-controller/tabs-controller";
import {OneSignal} from "@ionic-native/onesignal";
import {MeusPetsPage} from '../pages/meus-pets/meus-pets';
import {MensagemPage} from "../pages/mensagem/mensagem";

import {AngularFireAuth} from "angularfire2/auth";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public toast: ToastController, public afAuth: AngularFireAuth) {

        this.rootPage = TabsControllerPage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleLightContent();
            splashScreen.hide();

            // OneSignal Code start:
            // Enable to debug issues:
            //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            let funcaoRetorno = (data) => {
                //Direcionando para o chat pegando os dados da sala que sao enviados dentro na notificacao.
                let msg = data.notification.payload.additionalData;
                if (!data.notification.isAppInFocus) {
                    this.navCtrl.push(MensagemPage, {
                        'key': msg.pet,
                        'idGrouped': msg.sala,
                        'titulo': msg.titulo,
                        'id_interessado': msg.id_interessado
                    });
                } else {
                    this.toast.create({
                        message: 'Você recebeu uma menssagem',
                        duration: 2000
                    }).present();
                }
                console.log('NOTIFICATION RECEIVED', data);
            };

            window["plugins"].OneSignal.startInit("f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                "534848323519")
                .handleNotificationOpened(funcaoRetorno)
                .endInit();
        });
    }

    logoff(params) {
        this.afAuth.auth.signOut().then(()=>{
            localStorage.clear();
            if (!params) params = {};
            this.navCtrl.push(TabsControllerPage, null, {animation: 'md-transition'});
        });

    }
}
