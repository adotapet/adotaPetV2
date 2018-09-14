import {NavController, NavParams, AlertController} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {Post} from "../../models/post";
import { Component} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})

export class ProfilePage {

    profile = [];
    post = {} as Post;


    constructor(public navParams: NavParams, public navCtrl: NavController, private login: LoginProvider,
                public alert: AlertController, public afDb: AngularFireDatabase

    ) {
        console.log('profile.ts')

    }


    createProfile() {

//         if (this.post.estado == null) {
//
//             let alert = this.alert.create({
//                 title: 'Selecione um Estado',
//                 buttons: ['OK']
//             });
//             alert.present();
//
//         } else {
//             this.post.especie = "Todos";
//
//
//             localStorage.setItem('skipIntro', 'true');
//             localStorage.setItem('adotapet_filtros', JSON.stringify(this.post));
//
//
//             //cria o perfil e direciona pra home.
//             this.login.createProfile(this.navParams.get('userId'), this.profile, this.post);
//
//             console.log('perifl criado');
//             this.navCtrl.setRoot(TabsControllerPage);
//         }
     }


}