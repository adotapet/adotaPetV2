import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ToastController, Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireAuth} from "@angular/fire/auth";
import {TranslateService} from '@ngx-translate/core';
import {TabsControllerPage} from "../pages/tabs-controller/tabs-controller";
import {MensagemPage} from "../pages/mensagem/mensagem";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = TabsControllerPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public toast: ToastController,
              public afAuth: AngularFireAuth,
              public translate: TranslateService,
              public events: Events
  ) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();

      // substitui o navigator.globalization e obtendo a linguagem do celular
      const language = window.navigator.language;
      console.log(language);
      // Insere a lingua como padrao
      this.translate.setDefaultLang(language);
      this.translate.use(language);

      let funcaoRetorno = (data) => {
        //Direcionando para o chat pegando os dados da sala que sao enviados dentro na notificacao.
        let msg = data.notification.payload.additionalData;
        this.events.publish('notification:received', msg);

        if (!data.notification.isAppInFocus) {
          //  this.navCtrl.push(MensagemPage, {
          //
          //  });
        } else {
          console.log('app in focus');
        }
      };

      if (platform.is('cordova')) {
        let oneSignal = window['plugins'].OneSignal;
        oneSignal.startInit("f2dc92d3-6665-406d-8e5f-e7c6e19e822d", "534848323519")
          .inFocusDisplaying(0)
          .handleNotificationOpened(funcaoRetorno)
          .endInit();
      }
    });
  }
}
