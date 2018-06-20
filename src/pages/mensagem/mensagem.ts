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
    showEmojiPicker = false;
    titulo;

    constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, private chatProvider: ChatProvider, private auth: AuthProvider,  private events: Events) {
        this.key = params.get('key');
        this.idGrouped = params.get('idGrouped');
        let myInfo = this.auth.getUser();
        this.myId = myInfo.uid;
        this.titulo = params.get('titulo');
        this.listMessages();
    }

    listMessages() {
        this.chatProvider.getMenssagens(this.idGrouped).subscribe(data => {
            this.messages = data;
            this.content.scrollToBottom();
        });
    }

    sendMessage(msg) {
        this.chatProvider.sendMessage(msg, this.key, this.idGrouped);
        this.scrollToBottom();
        this.msgText = '';
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    private setTextareaScroll() {
        const textarea =this.messageInput.nativeElement;
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
