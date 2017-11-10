import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-adote',
  templateUrl: 'adote.html'
})
export class AdotePage {

  constructor(public navCtrl: NavController) {
  }
  goToPerfil(params){
    if (!params) params = {};
    this.navCtrl.push(PerfilPage);
  }
}
