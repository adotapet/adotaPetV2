import { Component } from '@angular/core';
import {ModalController, NavController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

/**
 * Generated class for the PleaseLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'please-login',
  templateUrl: 'please-login.html'
})
export class PleaseLoginComponent {

  text: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    console.log('Hello PleaseLoginComponent Component');
    this.text = 'Hello World';
  }

  gotoLogin(){
      let loginModal = this.modalCtrl.create('LoginPage');
      loginModal.present();
  }
}
