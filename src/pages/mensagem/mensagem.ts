import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, Content, Events} from 'ionic-angular';
import {ChatProvider} from "../../providers/chat/chat";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'page-mensagem',
    templateUrl: 'mensagem.html'
})
export class MensagemPage {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    messages: any[];
    msgText: string;
    key: string;
    myId;
    idGrouped: string;
    id_interessado: string;
    showEmojiPicker = false;
    titulo;

    constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, private chatProvider: ChatProvider, private auth: AuthProvider, private events: Events) {
        this.key = params.get('key');
        this.idGrouped = params.get('idGrouped');
        this.id_interessado = params.get('id_interessado');
        let myInfo = this.auth.getUser();
        this.myId = myInfo.uid;
        this.titulo = params.get('titulo');
        this.listMessages();
    }

    ionViewDidLoad() {
        this.scrollToBottom();
    }

    listMessages() {
        this.chatProvider.getMenssagens(this.idGrouped).subscribe(data => {
            this.messages = data;
            this.scrollToBottom();
        });
    }

    sendMessage(msg) {
        this.chatProvider.sendMessage(msg, this.key, this.idGrouped, this.id_interessado);
        this.msgText = '';
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom(200);
            }
        }, 500)
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    private setTextareaScroll() {
        const textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        } else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }
}
