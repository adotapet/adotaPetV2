import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {MensagemPage} from '../mensagem/mensagem';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
//import {FCM} from '@ionic-native/fcm';
//import {HTTP} from '@ionic-native/http';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    messages = [];

    constructor(public navCtrl: NavController, public params: NavParams, private http: HttpClient, public modal: ModalController) {
        this.messages = [
            {
                img: 'build/img/hugh.png',
                position: 'left',
                content: 'Hello from the other side.',
                senderName: 'Gregory',
                time: '28-Jun-2016 21:53'
            },
            {
                img: 'build/img/hugh.png',
                position: 'right',
                content: 'Hi! How are?',
                senderName: 'Me',
                time: '28-Jun-2016 21:55'
            },
            {
                img: 'build/img/hugh.png',
                position: 'left',
                content: "This is some really long test that I'm writing here. Let's see how it wraps.",
                senderName: 'Gregory',
                time: '28-Jun-2016 21:57'
            }
        ];
    }

    sendNotification(token) {
        console.log('tokennn', token);

        //let headers = {
        //  'Content-Type': 'application/json',
        //  'Autorization': 'key=AIzaSyAgCuNyINj93Qo3sB0ghvKxGfAwxuxSnqE'
        //};
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
        // this.http.setHeader('Autorization', 'AIzaSyDiyw2MVTGxV0tVIiUkn0DP_Q39sFwskxA');
        // this.http.setHeader( 'Content-Type', 'application/json');
        this.http.post('https://fcm.googleapis.com/fcm/send', data, {
            headers: {
                'Autorization': 'AIzaSyDiyw2MVTGxV0tVIiUkn0DP_Q39sFwskxA',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).subscribe(res => {
            alert('notification sended');
            console.log('response headers', res);
            //console.log('response data', res.data);
            //console.log('response status', res, status);
        }, error2 => {
            console.log(error2.headers);
        })
    }

    goToMensagem(params) {
        if (!params) params = {};
        let chatModal = this.modal.create(MensagemPage, {data: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}, {showBackdrop: true});
        chatModal.onDidDismiss(data => {
            console.log(data);
        });
        chatModal.present();
    }

}
