import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {OneSignal, OSNotification} from "@ionic-native/onesignal";

@Component({
    selector: 'page-mensagem',
    templateUrl: 'mensagem.html'
})
export class MensagemPage {

    messages = [];
    contactName = 'Contact xx';
    msgText: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, private oneSignal: OneSignal) {
        console.log('menssagem page');
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

    dismiss() {
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }

    sendNotification(text){
        console.log('clicked send');
       this.oneSignal.getIds().then(data => {
           console.log(data);
           let msg = {
               "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
               "data": {"msg": 'sdfdfdfdf'},
               "contents": {"en": "English Message", "pt": "em portugues"},
               "include_player_ids": [data.userId]
           };
           console.log(msg);

           this.oneSignal.postNotification(msg).then(() => {
              alert('notificacao enviadaaaaa');
           });
       });


    }
}
