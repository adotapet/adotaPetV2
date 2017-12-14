import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from '../mensagem/mensagem';
import {ChatProvider} from "../../providers/chat/chat";

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    messages: any;
    notification = '';
    error: any;
    register;
    conversasEnviadas: any;
    conversasRecebidas: any;

    constructor(public navCtrl: NavController, public params: NavParams, private chat: ChatProvider) {

        chat.getConversasEnviadas().on('child_added', function (snap) {
            this.conversasEnviadas.push(snap);
        });
        chat.getConversasRecebidas().on('child_added', function (snap) {
            this.conversasRecebidas.push(snap);
        });
    }

    sendNotification(token) {

    }


    goToMensagem(key) {
        if (!key) key = null;
        this.navCtrl.push(MensagemPage, {"key": key});
    }

}
