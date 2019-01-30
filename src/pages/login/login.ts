import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {User} from "../../models/user";
import {CadastrarPage} from "../cadastrar/cadastrar";
import {AngularFireAuth} from "@angular/fire/auth";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {Facebook} from "@ionic-native/facebook";
import {ProfilePage} from "../profile/profile";
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthProvider} from "../../providers/auth/auth";
import {auth} from "firebase/app";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;
  loading: any;
  email: string;


  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public facebook: Facebook,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider
  ) {
  }

  async login(user) {
    let loading = this.loadingCtrl.create({
      content: 'Fazendo login...'
    });
    await loading.present();
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log('email verificado', result.user.emailVerified);
      localStorage.setItem('skipIntro', 'true');
      this.navCtrl.setRoot(TabsControllerPage, null, {animation: 'ios-transition'});
      await loading.dismiss();
    } catch (e) {
      loading.dismiss();
      await this.afAuth.auth.signOut();
      let errorMsg = '';
      switch (e.code) {
        case 'auth/user-disabled' :
          errorMsg = 'Este usuário foi desativado.';
          break;
        case 'auth/user-not-found' :
          errorMsg = 'Nenhum usuário cadastrado com esse email!';
          break;
        case 'auth/invalid-email' :
          errorMsg = 'Formato de Email inválido!';
          break;
        case 'auth/wrong-password' :
          errorMsg = 'Senha incorreta!';
          break;
        case 'auth/email-nao-verificado' :
          errorMsg = 'Email não verificado, cheque sua caixa de email!';
          break;
        default:
          errorMsg = 'Erro desconhecido tente novamente mais tarde.';
          break;
      }
      let alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: errorMsg,
        buttons: ['OK']
      });
      alert.present();
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push(CadastrarPage);
  }

  recuperarSenha() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Senha',
      inputs: [
        {
          name: 'email',
          placeholder: 'email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Recuperar',
          handler: data => {
            if (data.email) {
              let result = this.authProvider.resetPassword(data.email);
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  //Login com Facebook

  async facebookLogin() {
    this.loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });
    this.loading.present();
    try {
      let response = await this.facebook.login(['public_profile', 'email']);
      const facebookCredential = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      let success = await this.afAuth.auth.signInWithCredential(facebookCredential);
      console.log("Firebase success: " + JSON.stringify(success));

      this.afDatabase.list(`profile/${success.uid}`).valueChanges().subscribe(data => {
        if (data) {
          this.navCtrl.setRoot(TabsControllerPage);
          this.loading.dismiss();
        } else {
          console.log('!hasProfile');
          this.navCtrl.setRoot(ProfilePage, {"userId": success.uid});
          this.loading.dismiss();

        }
      },error => this.loading.dismiss());

    } catch (e) {
      console.error(e);
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'ERRO',
        subTitle: e,
        buttons: ['ok']
      });
      alert.present();
    }
  }
}
