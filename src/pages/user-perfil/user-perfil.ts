import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdmobProvider } from '../../providers/admob/admob';


@Component({
  selector: 'page-user-perfil',
  templateUrl: 'user-perfil.html'
})
export class UserPerfilPage implements OnInit {
  section: string = 'one';
  canEnter: boolean = false;
  public user: firebase.User;
  isloging: boolean;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private admob: AdmobProvider
  ) {


  }

  async ngOnInit(): Promise<void> {
    this.admob.showBanner();
  }
  ionViewWillEnter() {
    this.auth.autenticated.subscribe(async (value: firebase.User) => {
      let translation: string = this.translate.instant('Faça login para continuar');
      this.user = await value;
      console.log('retorno', value);
      console.log(translation);
      if (!value) {
        let toast = this.toastCtrl.create({
          message: 'Faça login para continuar',
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
      }
      !value ? (this.admob.interstitial()) : null;
      !value ? (this.canEnter = false) : (this.canEnter = true);

    });
  }


  async logOf() {
    const loading = await this.loadingCtrl.create({ "content": 'Logout...' });
    loading.present();
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();

      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      }, 1000)
    });
  }

}
