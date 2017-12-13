import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GoogleAnalytics} from '@ionic-native/google-analytics';

import {LoginPage} from '../pages/login/login';
import {TabsControllerPage} from "../pages/tabs-controller/tabs-controller";
import {OneSignal} from "@ionic-native/onesignal";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private ga: GoogleAnalytics, public oneSignal: OneSignal) {

        this.ga.startTrackerWithId('AIzaSyAgCuNyINj93Qo3sB0ghvKxGfAwxuxSnqE')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackView('test');
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
            statusBar.styleDefault();
            splashScreen.hide();

            // OneSignal Code start:
            // Enable to debug issues:
            //window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            let funcaoRetorno = (data) => {
                //colocar aqui o que fazer se a notificacao for clicada
                console.log('Notificações: ' + JSON.stringify(data));
            };

            window["plugins"].OneSignal.startInit("f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                "534848323519")
                .handleNotificationOpened(funcaoRetorno)
                .endInit();

            //this.oneSignal.startInit('f2dc92d3-6665-406d-8e5f-e7c6e19e822d', '534848323519');

        });
    }

}
