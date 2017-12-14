import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MensagemPage} from "../mensagem/mensagem";

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  pet: any;
  key: string = 'aaaaaaaa';
  constructor(public navCtrl: NavController,public params: NavParams) {
    this.pet = params.get('pet');
    this.key = params.get('key');
    console.log(this.pet);
  }


  goToChat(){
    let key = this.key;
    console.log(key);
    this.navCtrl.push(MensagemPage, {"key": key, "dono": this.pet.user});
  }
  
}
