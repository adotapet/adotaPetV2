import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {CadastrarPage} from "../cadastrar/cadastrar";
import {AngularFireAuth} from "angularfire2/auth";
import {AdotePage} from "../adote/adote"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ion load login page')
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      if (result) {
        this.navCtrl.setRoot(AdotePage);
      }
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push(CadastrarPage);
  }
}
