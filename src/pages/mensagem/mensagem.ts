import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {OneSignal} from "@ionic-native/onesignal";
import {ChatProvider} from "../../providers/chat/chat";
import {AuthProvider} from "../../providers/auth/auth";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'page-mensagem',
    templateUrl: 'mensagem.html'
})
export class MensagemPage {

    messages: any[];
    contactName = 'Contact xx';
    msgText: string;
    key: string;
    dono: string;
    myId;
    idGrouped: string;
    dadosSala;

    constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, private chatProvider: ChatProvider, private oneSignal: OneSignal, private auth: AuthProvider) {
        this.key = params.get('key');
        this.dono = params.get('dono');
        let myInfo = this.auth.getUser();
        this.myId = myInfo.uid;
        this.idGrouped = `${this.dono}_${myInfo.uid}_${this.key}`;
        console.log(this.idGrouped);
        this.listMessages();
    }


    async listMessages(){
        this.chatProvider.getMenssagens(this.idGrouped).subscribe(data => {
            console.log('msgs', data);
            this.messages = data;
        });
    }


    dismiss() {
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }

    sendMessage(msg) {
        this.chatProvider.sendMessage(msg, this.key, this.idGrouped);
        this.msgText = '';
    }

    sendNotification(text) {
        console.log('clicked send');
        this.oneSignal.getIds().then(data => {
            console.log(data);
            let msg = {
                "app_id": "f2dc92d3-6665-406d-8e5f-e7c6e19e822d",
                "data": {"sala": "1212hv2hv1h2v1hv"},
                "contents": {"en": "English Message", "pt": text},
                "include_player_ids": [data.userId]
            };
            console.log(msg);

            this.oneSignal.postNotification(msg).then(() => {
                alert('notificacao enviadaTT');
            });
        });
    }
}
