import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {CadastrarPage} from "../cadastrar/cadastrar";
import {AngularFireAuth} from "angularfire2/auth";
import {AdotePage} from "../adote/adote"
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase/app';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController,
              public navParams: NavParams, public facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ion load login page')
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      if (result) {
        localStorage.setItem('skipIntro', 'true');
        this.navCtrl.setRoot(TabsControllerPage);
      }
      console.log(result);
    } catch (e) {
      console.error(e);
      localStorage.setItem('skipIntro', 'false');
    }
  }

  register() {
    this.navCtrl.push(CadastrarPage);
  }

  //Login com Facebook

    facebookLogin(): Promise<any> {
        return this.facebook.login(['email'])
            .then( response => {
                const facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);

                firebase.auth().signInWithCredential(facebookCredential)
                    .then( success => {
                        console.log("Firebase success: " + JSON.stringify(success));
                        localStorage.setItem('skipIntro', 'true');
                        this.navCtrl.setRoot(TabsControllerPage);
                    });

            }).catch((error) => { console.log(error) });

    }
}
