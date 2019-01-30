import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
//import {AndroidPermissions} from "@ionic-native/android-permissions";
import {AngularFireAuth} from "@angular/fire/auth";

import {TranslateService} from '@ngx-translate/core';
import {OneSignal} from "@ionic-native/onesignal";
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
              //private androidPermissions: AndroidPermissions,
              public translate: TranslateService,
              public oneSignal: OneSignal
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

      // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.GEOLOCATION).then((retorno) => console.log('perguntado', retorno));

      //  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.GEOLOCATION).then(result => {
      //      //console.log('Has permission?', result.hasPermission),
      //      console.log('resultPermission', result);
      //      if (result.hasPermission) {
      //          this.androidPermissions.requestPermissions([
      //              this.androidPermissions.PERMISSION.GEOLOCATION,
      //              this.androidPermissions.PERMISSION.GET_ACCOUNTS
      //          ]);
      //      }
      //  });


      const onSuccess = function (position) {
        console.log('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
      };

      //let androidPermissions = this.androidPermissions;

      //let onError = (error) => {
      //  console.log('retorno alert', error);
      //  alert('Este APP funciona pela localizacão, listando PETS em adoção proxímo a você! ' +
      //    'Permita a localizacao para listar os PETS   ');
      //  // androidPermissions.requestPermissions([androidPermissions.PERMISSION.GEOLOCATION]);
      //};

      //navigator.geolocation.getCurrentPosition(onSuccess, onError);


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
        }
      };

      if (platform.is('cordova')) {
        let oneSignal = window['plugins'].OneSignal;
        oneSignal.startInit("f2dc92d3-6665-406d-8e5f-e7c6e19e822d", "534848323519")
          .handleNotificationOpened(funcaoRetorno)
          .endInit();
      }
    });
  }

  logoff(params) {
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      if (!params) params = {};
      this.navCtrl.push(TabsControllerPage, null, {animation: 'md-transition'});
    });

  }
}
