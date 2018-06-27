import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/**
 * Generated class for the UserPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-perfil',
  templateUrl: 'user-perfil.html',
})
export class UserPerfilPage {

    section: string = 'one';
 
    constructor(public navCtrl: NavController) {
 
    }
}
