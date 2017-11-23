import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from '../mensagem/mensagem';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {FCM} from '@ionic-native/fcm';
import {HTTP, HTTPResponse} from '@ionic-native/http';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  msg: any;
  notification = '';
  error: any;
  register;
  sendToken;

  constructor(public navCtrl: NavController, public params: NavParams, private push: Push, private fcm: FCM, private http: HTTP) {
    this.msg = this.params.get('notification');
    fcm.getToken().then(token => {
      console.log('getToken');
      this.sendNotification(token);
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        alert('tapped');
      } else {
        alert(data.message);
      }
    });

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
        console.log(notification.message);
      });
      pushObject.on('registration').subscribe((registration: any) => {
        this.register = registration.registrationId;
        console.log(registration.registrationId);

      });

      pushObject.on('error').subscribe(error => {
        this.error = error;
      });

    });


  }

  sendNotification(token) {
    console.log('tokennn', token);
    let headers = {
      'Content-Type': 'application/json',
      'Autorization': 'key=AIzaSyAgCuNyINj93Qo3sB0ghvKxGfAwxuxSnqE'
    };
    let data = {
      "notification": {
        "title": "In app notification test",
        "body": "Notification body",
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "param1": "value1",
        "param2": "value2"
      },
      "to": token,
      "priority": "high",
      "restricted_package_name": ""
    };
    this.http.setHeader('Autorization', 'key=AIzaSyAgCuNyINj93Qo3sB0ghvKxGfAwxuxSnqE');
    this.http.setHeader('Content-Type', 'application/json');
    this.http.post('https://fcm.googleapis.com/fcm/send', data, Headers).then(res => {
      alert('notification sended');
      console.log('response', res);
    });
  }

  goToMensagem(params) {
    if (!params) params = {};
    this.navCtrl.push(MensagemPage);
  }

}
