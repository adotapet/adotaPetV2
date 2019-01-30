import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase} from "@angular/fire/database";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {throwError} from "rxjs";
import {OneSignal} from "@ionic-native/onesignal";

@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html'
})
export class CadastrarPage {

  user: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.user = this.formBuilder.group({
      'nome': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'senha': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  goToLogin(params) {
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }

  async register() {
    let loading = this.loadingCtrl.create({
      content: 'Criando conta...',
    });
    await loading.present();
    try {
      if (this.user.value.senha != this.user.value.confirmPassword) {
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Senhas diferentes',
          buttons: ['OK']
        });
        await loading.dismiss();
        alert.present();
      } else {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.value.email, this.user.value.senha);
        await this.afAuth.auth.currentUser.updateProfile({
          displayName: this.user.value.nome,
          photoURL: null
        });
        let signalUser =  await this.oneSignal.getIds();
        console.log("OneSignal User ID:", signalUser);
        let userObj = {
          'nome': this.user.value.nome,
          'pushToken': signalUser.pushToken || null,
          'userId': signalUser.userId || null
        };
        console.log('user uid', result.user.uid);
        await this.afDb.object('profile/' + result.user.uid).set(userObj);
        this.user.reset();
        await loading.dismiss();
        this.navCtrl.pop();
      }
    } catch (e) {
      loading.dismiss();
      let errorMsg = '';
      switch (e.code) {
        case 'auth/email-already-in-use' :
          errorMsg = 'Email já em uso no aplicativo.';
          break;
        case 'auth/network-request-failed' :
          errorMsg = 'Não foi possivel acessar o servidor, verifique sua conexão!';
          break;
        case 'auth/invalid-email' :
          errorMsg = 'Formato de Email inválido!';
          break;
        case 'auth/weak-password' :
          errorMsg = 'Senha fraca!';
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

}
