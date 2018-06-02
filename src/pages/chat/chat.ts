import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from '../mensagem/mensagem';
import {ChatProvider} from "../../providers/chat/chat";
import {OneSignal} from "@ionic-native/onesignal";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    notification = '';
    error: any;
    conversasEnviadas: any[];
    conversasRecebidas: any[];

    constructor(public navCtrl: NavController, public params: NavParams, private chat: ChatProvider, public oneSignal: OneSignal, private afDatabase: AngularFireDatabase,) {


    }

    ionViewDidEnter() {
        let profile;
        this.oneSignal.getIds().then(data => {
            profile.notificationToken = data.userId;
            console.log('iddsssssssss', data);
            this.afDatabase.object(`profile/${data}`).set(profile).then(a => {
                console.log('token atualizado')
            });
        });
        this.chat.getConversasRecebidas().subscribe(data => {
            this.conversasRecebidas = data;
            console.log(data)
        });
        this.chat.getConversasEnviadas().subscribe(data => {
            this.conversasEnviadas = data;
            console.log(data)
        });
    }

    goToMensagem(sala) {
        if (!sala) sala = null;
        this.navCtrl.push(MensagemPage, {"key": sala.pet, "idGrouped": sala.dono_interessado_pet});
    }

}