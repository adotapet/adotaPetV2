import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AdotePage} from "../adote/adote";
import {AdicionarPetPage} from "../adicionar-pet/adicionar-pet";
import {UserPerfilPage} from "../user-perfil/user-perfil";

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = AdotePage;
  tab2Root: any = AdicionarPetPage;
  tab3Root: any = UserPerfilPage;

  constructor(public navCtrl: NavController) {


  }


  goToAdote(params) {
    if (!params) params = {};
    this.navCtrl.push('AdotePage');
  }

  goToPerfil(params) {
    if (!params) params = {};
    this.navCtrl.push('PerfilPage');
  }

  goToUserPerfil(params) {
    if (!params) params = {};
    this.navCtrl.push('UserPerfilPage');
  }

  goToChat(params) {
    if (!params) params = {};
    this.navCtrl.push('ChatPage');
  }

  goToMensagem(params) {
    if (!params) params = {};
    this.navCtrl.push('MensagemPage');
  }
}
