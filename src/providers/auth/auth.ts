import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {Observable} from "rxjs";
import {AlertController} from "ionic-angular";

@Injectable()
export class AuthProvider {


  constructor(
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private alertCtrl: AlertController
  ) {
  }

  async resetPassword(email: string) {
    try {
      let result = await this.afAuth.auth.sendPasswordResetEmail(email);
      let alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Verifique sua caixa de email',
        buttons: ['ok']
      });
      alert.present();
      return;
    } catch (e) {
      let errorMsg = '';
      switch (e.code) {
        case 'auth/user-not-found' :
          errorMsg = 'Nenhum usuário cadastrado com esse email!';
          break;
        case 'auth/invalid-email' :
          errorMsg = 'Formato de Email inválido!';
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
      return false;
    }
  }

  get autenticated(): Observable<any> {
    return this.afAuth.authState
  }


  getUser(): Promise<any> {
    return new Promise((resolve) => {
      let currentUser = this.afAuth.auth.currentUser;
      resolve(currentUser);
    })
  }

  getUserPerfil(userId = null) {
    let id;
    if (userId) {
      id = userId;
    } else {
      this.getUser().then(user => {
        id = user.uid;
      });
    }
    try {
      return this.afDb.database.ref('profile/' + id);
    } catch (e) {
      console.log(e);
    }
  }

}

