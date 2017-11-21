import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MensagemPage} from '../mensagem/mensagem';
import {Push, PushObject, PushOptions} from '@ionic-native/push';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  msg: any;
  notification = '';
  error: any;
  register;

  constructor(public navCtrl: NavController, private push: Push) {
    this.push.hasPermission().then((res: any) => {

      if (res.isEnabled) {
        this.msg = 'Tem permissao'
      } else {
        this.msg = 'We do not have permission to send push notifications';
      }

      // to initialize push notifications

      const options: PushOptions = {
        android: {},
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {
          alert: 'true',
          badge: true,
          sound: 'true'
        },
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => {
        this.notification = notification.message;
      });

      pushObject.on('registration').subscribe((registration: any) => {
        this.register = registration.valueOf();
      });

      pushObject.on('error').subscribe(error => {
        this.error = error;
      });

    });


  }

  goToMensagem(params) {
    if (!params) params = {};
    this.navCtrl.push(MensagemPage);
  }

}
