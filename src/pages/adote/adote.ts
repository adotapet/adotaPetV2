import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'page-adote',
    templateUrl: 'adote.html'
})
export class AdotePage {

    posts: any[];

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public toast: ToastController) {

    }

    ionViewDidLoad() {
        this.afAuth.authState.subscribe(data => {
            if (data && data.email && data.uid) {
                //  this.toast.create({
                //    message: `Bem-vindo ao Adota Pet, ${data.email}`,
                //    duration: 3000
                //  }).present();
            } else {
                this.toast.create({
                    message: `Bem-Vindo ao Adota Pet`,
                    duration: 1000
                })
            }

        })
        this.listPets();
    }

    async listPets() {
        this.db.list('BR/adocao/pets').snapshotChanges().subscribe(data => {
            this.posts = data;
            console.log(data);
        });
    }

    goToPerfil(key, data) {
        this.navCtrl.push(PerfilPage, {"pet": data, "key": key});
    }
}
