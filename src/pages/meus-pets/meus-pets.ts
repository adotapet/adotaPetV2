import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'page-meus-pets',
    templateUrl: 'meus-pets.html'
})
export class MeusPetsPage {

    myPets = [];
    myId: string;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                public navCtrl: NavController,
                public toast: ToastController,
                private authProvider: AuthProvider) {

    }

    ionViewDidLoad() {
        this.myId = this.authProvider.getUser().uid;
        this.listPets();
    }

    async listPets() {
        this.db.list('BR/adocao/pets', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
            this.myPets = data;
            console.log(data);
        });
    }

}
