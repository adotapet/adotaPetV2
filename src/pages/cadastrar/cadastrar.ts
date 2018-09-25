import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage({
    priority:'low'
})
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html'
})
export class CadastrarPage {

  user = {email: '', password: ''};
  confirmPassword;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push('LoginPage');
  }

  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.push('LoginPage');
    }catch (e){
      console.error(e);
    }
  }

}
