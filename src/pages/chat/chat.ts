import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from '../mensagem/mensagem';
import {ChatProvider} from "../../providers/chat/chat";

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    notification = '';
    error: any;
    conversasEnviadas: any[];
    conversasRecebidas: any[];

    constructor(public navCtrl: NavController, public params: NavParams, private chat: ChatProvider) {


    }

    ionViewDidEnter() {
        try {
            this.chat.getConversasRecebidas().subscribe(data => {
                this.conversasRecebidas = data;
                console.log(data)
            });
            this.chat.getConversasEnviadas().subscribe(data => {
                this.conversasEnviadas = data;
                console.log(data)
            });
        } catch (e) {
            console.error(e);
        }

    }

    goToMensagem(sala) {
        if (!sala) sala = null;
        this.navCtrl.push(MensagemPage, {"key": sala.pet, "idGrouped": sala.dono_interessado_pet});
    }

}
