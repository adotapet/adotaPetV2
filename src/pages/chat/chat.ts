import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {PerfilPage} from "../perfil/perfil";

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    text: string;
    img:any;
    pet;
    key;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams) {
        console.log('Hello MarkerPopupComponent Component');
        this.pet = params.get('pet');
        this.key = params.get('key');
        this.text = this.pet.nome;
        this.img = this.pet.fotoUrls;
console.log(this.pet)
    }

    goToPerfil(key, data) {
        this.navCtrl.push(PerfilPage,{"pet": this.pet, "key": this.key})
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    closeModal() {
        this.navCtrl.pop();
    }

}