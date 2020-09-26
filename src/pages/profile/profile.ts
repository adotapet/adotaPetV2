import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OneSignal } from "@ionic-native/onesignal";
import { TabsControllerPage } from "../tabs-controller/tabs-controller";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  userId: string;
  profile: FormGroup;
  pushToken: any;
  oneSignalUserId: string;

  constructor(public navParams: NavParams, public navCtrl: NavController,
    public alert: AlertController, public afDb: AngularFireDatabase, public formBuilder: FormBuilder,
    private oneSignal: OneSignal
  ) {
    this.userId = this.navParams.get('userId');
    this.profile = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required, Validators.minLength(4)
      ])],
    });
  }

  ionViewDidLoad() {
    this.oneSignal.getIds().then((signalUser) => {
      console.log("OneSignal User ID:", signalUser);
      this.pushToken = signalUser.pushToken;
      this.oneSignalUserId = signalUser.userId;
    }, error => {
      console.log('Nao foi possivel pegar o token de notificação', error);
    });
  }


  createProfile() {
    if (this.pushToken && this.oneSignalUserId) {
      let userObj = {
        'nome': this.profile.value.nome,
        'pushToken': this.pushToken,
        'userId': this.oneSignalUserId
      };
      this.afDb.object('profile/' + this.userId).set(userObj).then(() => {
        this.profile.reset();
        this.navCtrl.setRoot(TabsControllerPage, null, { animation: 'ios-transition' })
      });
    } else {
      alert('Nao foi possivel pegar o token da notificação');
    }

  }

}
