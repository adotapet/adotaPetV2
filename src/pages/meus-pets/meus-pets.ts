import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'page-meus-pets',
    templateUrl: 'meus-pets.html'
})
export class MeusPetsPage {

    myPets = [];
    myId: string;

    constructor(private db: AngularFireDatabase,
                public navCtrl: NavController,
                private authProvider: AuthProvider,
                private alert: AlertController,
                private toastCtrl: ToastController) {

    }

    ionViewDidLoad() {
        this.myId = this.authProvider.getUser().uid;
        this.listPets();
        console.log(this.myId);
    }

    async listPets() {
        this.db.list('BR/adocao/pets', ref => ref.orderByChild('user').equalTo(this.myId)).snapshotChanges().subscribe(data => {
            this.myPets = data;
            console.log('PETS', data);
        });
    }

    deletePet(id, pet) {
        console.log('pet deleeete', pet);

        let popup = this.alert.create({
            title: 'Tem certeza que quer excluir o Pet?',
            buttons: [{
                text: 'Sim',
                role: 'confirm',
                handler: () => {
                    this.db.list('BR/adocao/pets/' + id).remove().then(() => {
                       this.presentToast(pet);
                    });
                }
            },
                {
                    text: 'Nao',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        popup.present();

    }

    presentToast(pet) {
        let toast = this.toastCtrl.create({
            message: 'O ' + pet + ' foi removido!',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }
}
