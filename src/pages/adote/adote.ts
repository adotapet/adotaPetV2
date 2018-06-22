import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'page-adote',
    templateUrl: 'adote.html'
})
export class AdotePage {

    posts:any;
    user: any;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                public navCtrl: NavController,
                public toast: ToastController,
                private auth: AuthProvider) {

    }


    ionViewDidLoad() {
        this.user = this.auth.getUser();
        console.log(this.user);
        this.listPets();


        this.afAuth.authState.subscribe(data => {
            if (data && data.email && data.uid) {
                this.toast.create({
                    message: `Bem-vindo ao Adota Pet, ${data.email}`,

                    duration: 1900
                }).present();
            } else {
                this.toast.create({
                    message: `Bem-Vindo ao Adota Pet`,
                    duration: 1000
                });
                console.log(data);

            }

        });
    }

    async listPets() {
        this.db.list('BR/adocao/pets', ref => ref.orderByChild('estado').equalTo('DF')).snapshotChanges().subscribe(data =>{
            this.posts = data;
        });
    }

    goToPerfil(key, data) {
        this.navCtrl.push(PerfilPage, {"pet": data, "key": key});
    }


}
