import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MensagemPage } from '../mensagem/mensagem';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  constructor(public navCtrl: NavController) {
  }
  goToMensagem(params){
    if (!params) params = {};
    this.navCtrl.push(MensagemPage);
  }
}
