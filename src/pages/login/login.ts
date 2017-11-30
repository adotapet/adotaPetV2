import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {CadastrarPage} from "../cadastrar/cadastrar";
import {AngularFireAuth} from "angularfire2/auth";
import {TabsControllerPage} from "../tabs-controller/tabs-controller";
import {Facebook} from "@ionic-native/facebook";
import firebase from 'firebase/app';
import {ProfilePage} from "../profile/profile";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    user = {} as User;

    constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController,
                public navParams: NavParams, public facebook: Facebook) {
    }

    async login(user) {
        try {
            const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                let userId;
                let hasProfile;
                //se logou pega o uid do usuario
                await result.then(data => {
                    userId = data.uid;
                });
                //verifica se o usuario ja tem uma profile;
                await this.afDatabase.database.ref(`profile/${userId}`).once('value', data => {
                    hasProfile = data.val();
                });
                console.log(hasProfile);
                //Se tiver uma profile direciona pra home. se não vai pra pagina de cadastro da profile.
                if (hasProfile) {
                    console.log('hasProfile');
                    localStorage.setItem('skipIntro', 'true');
                    this.navCtrl.setRoot(TabsControllerPage);
                } else {
                    console.log('!hasProfile');
                    this.navCtrl.setRoot(ProfilePage, {"userId": userId});
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    register() {
        this.navCtrl.push(CadastrarPage);
    }

    //Login com Facebook

    facebookLogin(): Promise<any> {
        return this.facebook.login(['public_profile', 'email'])
            .then(response => {
                const facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);

                firebase.auth().signInWithCredential(facebookCredential)
                    .then(success => {
                        let hasProfile;
                        console.log("Firebase success: " + JSON.stringify(success));
                        this.afDatabase.database.ref(`profile/${success.uid}`).once('value', data => {
                            hasProfile = data.val();
                            if (hasProfile) {
                                console.log('hasProfile');
                                localStorage.setItem('skipIntro', 'true');
                                this.navCtrl.setRoot(TabsControllerPage);
                            } else {
                                console.log('!hasProfile');
                                this.navCtrl.setRoot(ProfilePage, {"userId": success.uid});
                            }
                        });

                    });

            }).catch((error) => {
                console.log(error)
            });

    }
}
