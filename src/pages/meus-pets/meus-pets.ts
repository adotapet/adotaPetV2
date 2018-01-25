import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

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
                private nativePageTransitions: NativePageTransitions,
                public ga: GoogleAnalytics,
                private authProvider: AuthProvider) {

    }

    ionViewDidLoad() {
        this.ga.trackView('meus-pets');
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
