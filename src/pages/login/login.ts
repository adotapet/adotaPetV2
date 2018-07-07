import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {User} from "../../models/user";
import {CadastrarPage} from "../cadastrar/cadastrar";
import {AngularFireAuth} from "angularfire2/auth";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {Facebook} from "@ionic-native/facebook";
import firebase from 'firebase/app';
import {ProfilePage} from "../profile/profile";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthProvider} from "../../providers/auth/auth";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    user = {} as User;
    loading: any;
    email: string;


    constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
                public navCtrl: NavController,
                public navParams: NavParams,
                public facebook: Facebook,
                public AlertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public authProvider: AuthProvider) {
    }

    async login(user) {
        try {
            const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                let userId;
                let hasProfile;
                //se logou pega o uid do usuario
                await result.then(data => {
                    userId = data.user.uid;
                });
                //verifica se o usuario ja tem uma profile;
                await this.afDatabase.database.ref(`profile/${userId}`).once('value', data => {
                    hasProfile = data.val();
                });
                console.log(hasProfile);
                //Se tiver uma profile direciona pra home. se não vai pra pagina de cadastro da profile.
                if (hasProfile) {

                    console.log(hasProfile);
                    localStorage.setItem('skipIntro', 'true');
                    // Salva o estado no local storage
                    localStorage.setItem('adotapet_filtros', JSON.stringify(hasProfile.adotapet_filtros));


                    this.navCtrl.setRoot(TabsControllerPage);
                } else {
                    console.log('!hasProfile');
                    this.navCtrl.setRoot(ProfilePage, {"userId": userId});
                }
            }
        } catch (e) {
            console.error(e);


            let alert = this.AlertCtrl.create({
                title: 'ERRO',
                subTitle: e,
                buttons: ['ok']
            });
            alert.present();


        }
    }

    register() {
        this.navCtrl.push(CadastrarPage);
    }

    recuperarSenha() {
        let alert = this.AlertCtrl.create({
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
                            this.authProvider.resetPassword(data.email);
                            // this.authProvider.afAuth.auth.sendPasswordResetEmail(data.email);
                            let alert = this.AlertCtrl.create({
                                title: 'Sucesso',
                                subTitle: 'Verifique sua caixa de email',
                                buttons: ['ok']
                            });
                            alert.present();

                        } else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    // anonimo() {
    //   this.navCtrl.push(TabsControllerPage);
    // }

    //Login com Facebook

    facebookLogin(): Promise<any> {


        return this.facebook.login(['public_profile', 'email'])
            .then(response => {


                const facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);
                this.loading = this.loadingCtrl.create({
                    content: 'Autenticando...'
                });

                this.loading.present();

                setTimeout(() => {
                    this.loading.dismiss();
                }, 5000);

                firebase.auth().signInWithCredential(facebookCredential)
                    .then(success => {


                        let hasProfile;
                        console.log("Firebase success: " + JSON.stringify(success));
                        this.afDatabase.database.ref(`profile/${success.uid}`).once('value', data => {
                            hasProfile = data.val();
                            if (hasProfile) {

                                console.log(hasProfile);
                                localStorage.setItem('skipIntro', 'true');
                                // Salva o estado em localstorage para filtros
                                localStorage.setItem('adotapet_filtros', JSON.stringify(hasProfile.adotapet_filtros));


                                this.navCtrl.setRoot(TabsControllerPage);
                                this.loading.dismiss();
                            } else {

                                console.log('!hasProfile');
                                this.navCtrl.setRoot(ProfilePage, {"userId": success.uid});
                                this.loading.dismiss();
                            }
                        });

                    });


            }).catch((error) => {
                console.error(error);

                let alert = this.AlertCtrl.create({
                    title: 'ERRO',
                    subTitle: error,
                    buttons: ['ok']
                });
                alert.present();
                //alert.dismiss();
            });


    }
}
