import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, Content} from 'ionic-angular';
import {ChatProvider} from "../../providers/chat/chat";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'page-mensagem',
    templateUrl: 'mensagem.html'
})
export class MensagemPage {

    messages: any[];
    msgText: string;
    key: string;
    myId;
    idGrouped: string;
    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, private chatProvider: ChatProvider, private auth: AuthProvider) {
        this.key = params.get('key');
        this.idGrouped = params.get('idGrouped');
        let myInfo = this.auth.getUser();
        this.myId = myInfo.uid;
        console.log(this.idGrouped);
        this.listMessages();
    }


    listMessages() {
        this.chatProvider.getMenssagens(this.idGrouped).subscribe(data => {
            this.messages = data;
            console.log(data);
            this.content.scrollToBottom();
        });

    }

    dismiss() {
        let data = {'foo': 'bar'};
        this.viewCtrl.dismiss(data);
    }

      sendMessage(msg) {
         this.chatProvider.sendMessage(msg, this.key, this.idGrouped);
         this.content.scrollToBottom();
         this.msgText = '';
     }
}
