import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GoogleAnalytics} from '@ionic-native/google-analytics';

import {LoginPage} from '../pages/login/login';
import {TabsControllerPage} from "../pages/tabs-controller/tabs-controller";
import {OneSignal} from "@ionic-native/onesignal";
import { FiltrosPage } from '../pages/filtros/filtros';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import {MeusPetsPage} from '../pages/meus-pets/meus-pets';

import {ApoioEPatrocinioPage} from '../pages/apoio-epatrocinio/apoio-epatrocinio';
import { AvaliePage } from '../pages/avalie/avalie';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                private ga: GoogleAnalytics, public oneSignal: OneSignal) {

        this.ga.startTrackerWithId('AIzaSyAgCuNyINj93Qo3sB0ghvKxGfAwxuxSnqE')
            .then(() => {
                console.log('Google analytics is ready now');
                // Tracker is ready
                // You can now track pages or set additional information such as AppVersion or UserId
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));

        const skipIntro = localStorage.getItem('skipIntro');
        console.log(skipIntro);
        if (skipIntro) {
            this.rootPage = TabsControllerPage;
        } else {
            this.rootPage = LoginPage;
        }
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleLightContent();
            splashScreen.hide();

            // OneSignal Code start:
            // Enable to debug issues:
            //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            let funcaoRetorno = (data) => {
                //colocar aqui o que fazer se a notificacao for clicada
                console.log('Notificações: ' + JSON.stringify(data));
                alert(JSON.stringify((data)));
            };

            window["plugins"].OneSignal.startInit("f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                "534848323519")
                .handleNotificationOpened(funcaoRetorno)
                .endInit();
        });
    }

    goToAvalie(params){
        if (!params) params = {};
        this.navCtrl.setRoot(AvaliePage);
    }goToFiltros(params){
        if (!params) params = {};
        this.navCtrl.setRoot(FiltrosPage);
    }goToNotificacoes(params){
        if (!params) params = {};
        this.navCtrl.setRoot(NotificacoesPage);
    }
    goToMeusPets(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(MeusPetsPage);
    }
    goToApoioEPatrocinio(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(ApoioEPatrocinioPage);
    }


    logoff() {
        localStorage.clear();
        this.rootPage = LoginPage;

    }

}
