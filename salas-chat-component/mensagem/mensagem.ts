// import {Component, ElementRef, ViewChild} from '@angular/core';
// import {NavController, NavParams, Content, Events} from 'ionic-angular';
// import {ChatProvider} from "../../providers/chat/chat";
// import {AuthProvider} from "../../providers/auth/auth";

// @Component({
//   selector: 'page-mensagem',
//   templateUrl: 'mensagem.html'
// })
// export class MensagemPage {

//   @ViewChild(Content) content: Content;
//   @ViewChild('chat_input') messageInput: ElementRef;
//   pet: any = {};
//   messages: any[];
//   msgText: string = '';
//   myId = null;
//   idSala = '';
//   showEmojiPicker = false;
//   titulo;

//   constructor(public navCtrl: NavController, public params: NavParams, public events: Events, private chatProvider: ChatProvider, private auth: AuthProvider) {
//     this.pet = params.get('pet') || null;
//     this.idSala = params.get('idSala') || null;
//     this.auth.getUser().then(user => {
//       this.myId = user.uid;
//       this.listMessages();
//       this.scrollToBottom();
//     });
//   }

//   ionViewCanEnter() {
//     this.auth.getUser().then(user => {
//       return user.uid;
//     });
//   }

//   ionViewDidLoad() {
//     this.events.publish('notification:opened');
//   }

//   listMessages() {
//     this.chatProvider.getMensagens(this.idSala).subscribe(data => {
//       this.messages = data.mensagens;
//       this.scrollToBottom();
//     });
//   }

//   sendMessage(msg: string) {
//     this.chatProvider.enviarMensagem(this.idSala, this.pet, this.myId, msg).then(result => {
//       console.log('MENSAGEM ENVIADA RETORNO', result);
//       this.showEmojiPicker = false;
//       this.content.resize();
//     }).catch(erro => {
//       console.log(erro);
//     });
//     this.msgText = '';
//     // this.scrollToBottom();
//   }

//   scrollToBottom() {
//     setTimeout(() => {
//       if (this.content.scrollToBottom) {
//         this.content.scrollToBottom(200);
//       }
//     }, 500)
//   }

//   private focus() {
//     if (this.messageInput && this.messageInput.nativeElement) {
//       this.messageInput.nativeElement.focus();
//     }
//   }

//   private setTextareaScroll() {
//     const textarea = this.messageInput.nativeElement;
//     textarea.scrollTop = textarea.scrollHeight;
//   }

//   switchEmojiPicker() {
//     this.showEmojiPicker = !this.showEmojiPicker;
//     if (!this.showEmojiPicker) {
//       this.focus();
//     } else {
//       this.setTextareaScroll();
//     }
//     this.content.resize();
//     this.scrollToBottom();
//   }

//   onFocus() {
//     this.showEmojiPicker = false;
//     this.content.resize();
//     this.scrollToBottom();
//   }
// }
